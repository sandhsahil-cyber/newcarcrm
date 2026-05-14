import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import * as Icons from 'lucide-react';
import './ExecutivePerformance.css';

// ── Helpers ──────────────────────────────────────────────────────────────────
const isExcelError = (v) =>
  /^#(DIV\/0!|N\/A|VALUE!|REF!|NAME\?|NUM!|NULL!)/.test(String(v).trim());

const cleanVal = (v) => {
  if (v === null || v === undefined || v === '') return 0;
  if (isExcelError(v)) return 0;
  const s = String(v).replace(/[^\d.-]/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

const formatValue = (v, isPct) => {
  if (isExcelError(v)) return "—";
  if (v === null || v === undefined || v === '') return "—";
  if (isPct) {
    let n = parseFloat(String(v).replace('%', ''));
    if (isNaN(n)) return "—";
    return n > 1 ? n.toFixed(1) + '%' : (n * 100).toFixed(1) + '%';
  }
  const num = cleanVal(v);
  return num.toLocaleString();
};

export default function ExecutivePerformance() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('All Teams');

  // ── CSV/Excel Parsing ──────────────────────────────────────────────────────
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

      let headerRowIdx = raw.findIndex(r => r.some(c => 
        ['S.C', 'S.C NAME', 'NAME'].includes(String(c).toUpperCase().trim())
      ));

      if (headerRowIdx === -1) return alert("Header row not found!");

      const headers = raw[headerRowIdx].map(h => String(h).trim()).filter(Boolean);
      const rows = [];
      let grandTotalRow = null;

      for (let i = headerRowIdx + 1; i < raw.length; i++) {
        const r = raw[i];
        if (!r || r.every(c => c === '')) continue;
        
        const obj = {};
        headers.forEach((h, idx) => { obj[h] = r[idx] ?? ''; });
        
        const name = String(obj[headers[0]] || '').trim();
        if (!name) continue;

        if (name.toUpperCase().includes('TOTAL')) {
          grandTotalRow = obj;
          continue;
        }

        // Team Detection (Simplified: assume all caps or specific keywords)
        const isTeamLeader = name === name.toUpperCase() && name.length > 2 && !/\d/.test(name);
        rows.push({ ...obj, _name: name, _isTL: isTeamLeader });
      }

      // Column Metadata (EV detection)
      const colMeta = headers.map(h => ({
        key: h,
        label: h,
        isEV: /EV|Harrier|Electric|E-/.test(h),
        isPct: /%|E2B|E2TD/.test(h)
      }));

      setData({ headers, rows, grandTotalRow, colMeta });
    };
    reader.readAsBinaryString(file);
  };

  // ── Filtering & Processing ──────────────────────────────────────────────────
  const teams = useMemo(() => {
    if (!data) return [];
    return ['All Teams', ...new Set(data.rows.filter(r => r._isTL).map(r => r._name))];
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!data) return [];
    if (activeTab === 'All Teams') return data.rows;
    
    // Logic: show TL and all rows until next TL
    const result = [];
    let capturing = false;
    for (const r of data.rows) {
      if (r._isTL) {
        capturing = (r._name === activeTab);
      }
      if (capturing) result.push(r);
    }
    return result;
  }, [data, activeTab]);

  const summaryStats = useMemo(() => {
    if (!data || !data.grandTotalRow) return [];
    return data.colMeta.slice(1, 8).map(m => ({
      label: m.label,
      value: formatValue(data.grandTotalRow[m.key], m.isPct)
    }));
  }, [data]);

  if (!data) {
    return (
      <div className="ep-page-wrapper">
        <div className="ep-header">
          <h1 className="ep-title">Executive Performance Report</h1>
          <p className="ep-subtitle">Upload CSV/Excel to generate professional analytics</p>
        </div>
        <div className="ep-upload-wrapper" style={{ textAlign: 'center', marginTop: '100px' }}>
          <label className="ep-upload-btn">
            <Icons.Upload size={20} />
            <span>Upload Performance Sheet</span>
            <input type="file" hidden onChange={handleFileUpload} accept=".xlsx,.xls,.csv" />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="ep-page-wrapper">
      <div className="ep-header">
        <h1 className="ep-title">JAI GANESH AUTO HUB</h1>
        <p className="ep-subtitle">Executive Performance Command Center</p>
      </div>

      {/* Overall Report Card */}
      <div className="ep-overall-card">
        <span className="ep-overall-label">Overall Performance Summary</span>
        <div className="ep-stats-grid">
          {summaryStats.map((s, i) => (
            <div key={i} className="ep-stat-item">
              <span className="ep-stat-label">{s.label}</span>
              <span className="ep-stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="ep-filters no-print">
        {teams.map(t => (
          <button 
            key={t} 
            className={`ep-filter-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="ep-table-container">
        <table className="ep-table">
          <thead>
            <tr>
              {data.colMeta.map(m => (
                <th key={m.key} className={m.isEV ? 'is-ev' : ''}>
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, i) => (
              <tr key={i} className={row._isTL ? 'ep-row-highlight' : ''}>
                {data.colMeta.map(m => (
                  <td key={m.key} className={m.isEV ? 'is-ev' : ''}>
                    {formatValue(row[m.key], m.isPct)}
                  </td>
                ))}
              </tr>
            ))}
            {/* Grand Total Row */}
            {data.grandTotalRow && (
              <tr className="ep-row-gt">
                <td>Grand Total</td>
                {data.colMeta.slice(1).map(m => (
                  <td key={m.key} className={m.isEV ? 'is-ev' : ''}>
                    {formatValue(data.grandTotalRow[m.key], m.isPct)}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="ep-actions no-print">
        <label className="ep-filter-tab" style={{ cursor: 'pointer' }}>
          <Icons.RefreshCcw size={14} style={{ marginRight: '6px' }} />
          <span>Change File</span>
          <input type="file" hidden onChange={handleFileUpload} accept=".xlsx,.xls,.csv" />
        </label>
        <button className="ep-btn-print" onClick={() => window.print()}>
          <Icons.Printer size={18} />
          <span>Print Report</span>
        </button>
      </div>
    </div>
  );
}
