import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import './SalesReport.css';

// ── helpers ───────────────────────────────────────────────────────────────────
const isExcelError = (v) =>
  /^#(DIV\/0!|N\/A|VALUE!|REF!|NAME\?|NUM!|NULL!)/.test(String(v).trim());

const cleanVal = (v) => {
  if (v === null || v === undefined || v === '') return 0;
  if (isExcelError(v)) return 0;
  const s = String(v).replace(/[^\d.-]/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

/** Parse any uploaded Excel into a report object */
const parseReport = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb  = XLSX.read(evt.target.result, { type: 'binary' });
        const ws  = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

        let title        = '';
        let date         = '';
        let headerRowIdx = -1;

        for (let i = 0; i < raw.length; i++) {
          const rowStr   = raw[i].join(' ').trim();
          const rowUpper = rowStr.toUpperCase();

          if (!title && (rowUpper.includes('JAI GANESH') || rowUpper.includes('AUTO HUB'))) {
            title = raw[i].find((c) => String(c).trim()) || 'JAI GANESH AUTO HUB';
          }
          if (!date && (rowUpper.includes('OVERALL REPORT AS ON') || rowUpper.includes('AS ON'))) {
            date = rowStr;
          }

          const hasScCol = raw[i].some(
            (c) =>
              String(c).toUpperCase().trim() === 'S.C' ||
              String(c).toUpperCase().trim() === 'S.C.' ||
              String(c).toUpperCase().trim() === 'S.C NAME'
          );
          if (hasScCol) { headerRowIdx = i; break; }
        }

        if (headerRowIdx === -1) {
          // Fallback to any row with "NAME"
          headerRowIdx = raw.findIndex(r => r.some(c => String(c).toUpperCase().includes('NAME')));
        }

        if (headerRowIdx === -1) throw new Error('Header row with S.C / NAME column not found.');

        const hdrs = raw[headerRowIdx].map((h) => String(h).trim()).filter(Boolean);

        const rows = [];
        let overallRow = null;

        for (let i = headerRowIdx + 1; i < raw.length; i++) {
          const row = raw[i];
          if (!row || row.every((c) => c === '')) continue;
          const obj = {};
          hdrs.forEach((h, idx) => { obj[h] = row[idx] ?? ''; });
          const name = String(obj[hdrs[0]] || '').trim();
          if (!name) continue;
          const nameUpper = name.toUpperCase();
          if (nameUpper.includes('OVERALL REPORT') || nameUpper === 'OVERALL') {
            overallRow = obj; continue;
          }
          if (nameUpper.includes('GRAND TOTAL') || nameUpper === 'TOTAL') continue;
          const isAllCaps = name === name.toUpperCase() && name.length > 2 && !/\d/.test(name);
          rows.push({ ...obj, _isManager: isAllCaps, _name: name });
        }

        // Detect percentage columns
        const pctCols = new Set();
        hdrs.slice(1).forEach(h => {
          const hu = h.toUpperCase();
          if (hu.includes('%') || hu.includes('E2B') || hu.includes('E2TD')) {
            pctCols.add(h);
          }
        });

        resolve({
          fileName: file.name,
          title:    title || 'Sales Report',
          date,
          headers:  hdrs,
          rows,
          pctCols,
          overallRow,
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsBinaryString(file);
  });

// ── sub-component: a single report panel ─────────────────────────────────────
function ReportPanel({ report }) {
  const { title, date, headers, rows, pctCols, overallRow } = report;

  const isPct = (h) => pctCols.has(h);

  const fmtNum = (v) => {
    const n = cleanVal(v);
    return n.toLocaleString();
  };

  const fmtPct = (v) => {
    const valStr = String(v).trim();
    let n = parseFloat(valStr.replace('%', ''));
    if (isNaN(n)) return '—';
    return n > 1 ? n.toFixed(1) + '%' : (n * 100).toFixed(1) + '%';
  };

  const execRows = rows.filter((r) => !r._isManager).length > 0
    ? rows.filter((r) => !r._isManager)
    : rows;

  const grandTotal = headers.slice(1).reduce((acc, h) => {
    if (overallRow && overallRow[h] !== undefined && overallRow[h] !== '') {
      acc[h] = cleanVal(overallRow[h]);
    } else {
      acc[h] = execRows.reduce((s, r) => s + cleanVal(r[h]), 0);
    }
    return acc;
  }, {});

  return (
    <div className="report-panel-container">
      {/* Report Header */}
      <div className="report-title-section">
        <h2 className="report-org-title">{title}</h2>
        {date && <p className="report-date">{date}</p>}
      </div>

      {/* Overall Summary Row */}
      {overallRow && (
        <div className="report-overall-card">
          <div className="report-overall-label">Overall Report</div>
          <div className="report-overall-grid">
            {headers.slice(1).map(h => (
              <div key={h} className="report-overall-item">
                <div className="report-overall-item-label">{h}</div>
                <div className="report-overall-item-value">
                  {isPct(h) ? fmtPct(overallRow[h]) : fmtNum(overallRow[h])}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards — totals only for non-% columns */}
      <div className="report-summary-cards">
        {headers.slice(1).filter(h => !isPct(h)).map(h => (
          <div key={h} className="report-summary-card">
            <div className="report-card-label">{h}</div>
            <div className="report-card-value">{grandTotal[h] || 0}</div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={row._isManager ? 'report-row-manager' : 'report-row-exec'}>
                {headers.map(h => (
                  <td key={h} className={isPct(h) ? 'report-cell-pct' : ''}>
                    {isPct(h) ? fmtPct(row[h]) : fmtNum(row[h])}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="report-row-total">
              <td>Grand Total</td>
              {headers.slice(1).map(h => (
                <td key={h}>{isPct(h) ? '' : (grandTotal[h] || 0)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function SalesReport() {
  const [report1, setReport1] = useState(null);
  const [report2, setReport2] = useState(null);
  const [error1,  setError1]  = useState('');
  const [error2,  setError2]  = useState('');

  // States as requested in TASK 2 (available for shared context if needed)
  const [reportTitle, setReportTitle] = useState('JAI GANESH AUTO HUB');
  const [reportDate, setReportDate] = useState('');
  const [overallData, setOverallData] = useState(null);

  const handleUpload = useCallback((slot) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const setErr = slot === 1 ? setError1 : setError2;
    const setRep = slot === 1 ? setReport1 : setReport2;
    setErr('');
    try {
      const result = await parseReport(file);
      setRep(result);
      // Sync global state with Report 1 for convenience
      if (slot === 1) {
        setReportTitle(result.title);
        setReportDate(result.date);
        setOverallData(result.overallRow);
      }
    } catch (err) {
      setErr(err.message);
    }
  }, []);

  const hasAny = report1 || report2;

  return (
    <div className="sr-container">
      {/* Upload Toolbar */}
      <div className="sr-header no-print">
        <h2 className="sr-title">Sales Report</h2>
        <div className="sr-actions">
          <label className="sr-upload-btn">
            📂 {report1 ? 'Replace Report 1' : 'Upload Report 1'}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload(1)} style={{ display: 'none' }} />
          </label>
          <label className="sr-upload-btn sr-upload-btn-2">
            📂 {report2 ? 'Replace Report 2' : 'Upload Report 2'}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload(2)} style={{ display: 'none' }} />
          </label>
          {hasAny && (
            <button className="sr-print-btn" onClick={() => window.print()}>
              🖨️ Print / Share
            </button>
          )}
        </div>
      </div>

      {/* File Chips */}
      {(report1 || report2) && (
        <div className="sr-file-chips no-print">
          {report1 && <span className="sr-chip sr-chip-1">📄 {report1.fileName}</span>}
          {report2 && <span className="sr-chip sr-chip-2">📄 {report2.fileName}</span>}
        </div>
      )}

      {/* Errors */}
      {error1 && <div className="sr-error">Report 1: {error1}</div>}
      {error2 && <div className="sr-error">Report 2: {error2}</div>}

      {/* Empty state */}
      {!hasAny && !error1 && !error2 && (
        <div className="sr-empty">
          <div className="sr-empty-icon">📊</div>
          <p>Upload your Excel / CSV reports to view them here</p>
          <p className="sr-empty-hint">
            Supports JAI GANESH format and standard sales executive reports.
          </p>
        </div>
      )}

      {/* Report Panels */}
      {hasAny && (
        <div className={`report-grid ${report1 && report2 ? 'grid-2' : 'grid-1'}`}>
          {report1 && <ReportPanel report={report1} />}
          {report2 && <ReportPanel report={report2} />}
        </div>
      )}
    </div>
  );
}
