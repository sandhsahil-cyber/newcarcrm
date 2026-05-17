import React, { useRef } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Chart from 'react-apexcharts';
import * as Icons from 'lucide-react';
import { useMarketShare } from '../contexts/MarketShareContext';
import './RTOMarketShare.css';

const RTOMarketShare = ({ readOnly = false }) => {
  const { rtoData, updateRtoData, clearRtoData } = useMarketShare();
  const fileInputRef = useRef(null);
  const reportRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const processedData = results.data.filter(row => row.City || row.Market).map(row => {
            const city = row.City || row.Market;
            const tiv = row.TIV || row.TotalVolume || 0;
            const ourReg = row.Tata || row.OurBrand || 0;
            const ms = tiv > 0 ? ((ourReg / tiv) * 100).toFixed(2) : 0;
            
            // Get competitors
            const competitors = Object.keys(row)
              .filter(key => !['City', 'Market', 'TIV', 'TotalVolume', 'Tata', 'OurBrand'].includes(key))
              .map(key => ({ name: key, reg: row[key] || 0 }));

            return {
              city,
              tiv,
              ourReg,
              ms: parseFloat(ms),
              competitors
            };
          });
          updateRtoData(processedData);
        },
        error: (err) => {
          alert('Error parsing CSV: ' + err.message);
        }
      });
    }
  };

  const downloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0f172a'
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('RTO_Market_Share_Report.pdf');
  };

  const shareWhatsApp = () => {
    if (!rtoData) return;
    const totalTiv = rtoData.reduce((sum, item) => sum + item.tiv, 0);
    const totalOur = rtoData.reduce((sum, item) => sum + item.ourReg, 0);
    const overallMs = ((totalOur / totalTiv) * 100).toFixed(2);

    const message = `*RTO Market Share Report Summary*\n\n` +
      `Total Market (TIV): ${totalTiv}\n` +
      `Our Brand Sales: ${totalOur}\n` +
      `Overall Market Share: ${overallMs}%\n\n` +
      `_Generated via DealerGuard ERP_`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!rtoData && readOnly) {
    return (
      <div className="rto-market-share glass market-card">
        <div className="no-data-msg">
          <Icons.Info size={48} color="var(--text-dim)" />
          <p>No Market Share data available. Please wait for the RTO department to upload the latest report.</p>
        </div>
      </div>
    );
  }

  const totalTiv = rtoData?.reduce((sum, item) => sum + item.tiv, 0) || 0;
  const totalOur = rtoData?.reduce((sum, item) => sum + item.ourReg, 0) || 0;
  const overallMs = totalTiv > 0 ? ((totalOur / totalTiv) * 100).toFixed(2) : 0;

  // Prepare Chart Data
  const chartOptions = {
    chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 4 } },
    colors: ['#e66239', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    xaxis: { 
      categories: rtoData?.map(d => d.city) || [],
      labels: { style: { colors: '#94a3b8' } }
    },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    legend: { labels: { colors: '#94a3b8' } },
    theme: { mode: 'dark' },
    grid: { borderColor: 'rgba(148, 163, 184, 0.1)' }
  };

  const chartSeries = [
    { name: 'Our Brand', data: rtoData?.map(d => d.ourReg) || [] },
    ...((rtoData?.[0]?.competitors || []).map(comp => ({
      name: comp.name,
      data: rtoData?.map(d => d.competitors.find(c => c.name === comp.name)?.reg || 0) || []
    })))
  ].slice(0, 5); // Limit to 5 series for clarity

  return (
    <div className="rto-market-share" ref={reportRef}>
      <div className="market-share-header">
        <div>
          <h2>RTO Market Share Dashboard</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Market Performance Analysis & Competitive Benchmarking</p>
        </div>
        {!readOnly && (
          <div className="header-actions">
            <button className="btn-icon primary" onClick={() => fileInputRef.current.click()}>
              <Icons.Upload size={18} />
              <span>Upload CSV</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".csv" 
              onChange={handleFileUpload} 
            />
            {rtoData && (
              <button className="btn-icon" onClick={clearRtoData} style={{ color: '#ef4444' }}>
                <Icons.Trash2 size={18} />
                <span>Clear</span>
              </button>
            )}
          </div>
        )}
      </div>

      {rtoData ? (
        <>
          <div className="summary-ribbon">
            <div className="summary-card glass">
              <div className="summary-icon" style={{ color: '#3b82f6' }}><Icons.Globe size={24} /></div>
              <div className="summary-info">
                <h4>Total Market (TIV)</h4>
                <span className="value">{totalTiv.toLocaleString()}</span>
              </div>
            </div>
            <div className="summary-card glass">
              <div className="summary-icon" style={{ color: '#e66239' }}><Icons.Car size={24} /></div>
              <div className="summary-info">
                <h4>Our Brand Sales</h4>
                <span className="value">{totalOur.toLocaleString()}</span>
              </div>
            </div>
            <div className="summary-card glass">
              <div className="summary-icon" style={{ color: '#10b981' }}><Icons.TrendingUp size={24} /></div>
              <div className="summary-info">
                <h4>Overall MS%</h4>
                <span className="value">{overallMs}%</span>
              </div>
            </div>
            <div className="header-actions no-print" style={{ justifyContent: 'flex-end', flex: 1 }}>
              <button className="btn-icon" onClick={downloadPDF}>
                <Icons.Download size={18} />
                <span>Download PDF</span>
              </button>
              <button className="btn-icon whatsapp" onClick={shareWhatsApp}>
                <Icons.MessageSquare size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="market-share-grid">
            <div className="market-card glass">
              <h3>Brand Comparison by City</h3>
              <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
            </div>

            <div className="market-card glass">
              <h3>Market Share Details</h3>
              <div className="table-container">
                <table className="market-table">
                  <thead>
                    <tr>
                      <th>City/Market</th>
                      <th>TIV</th>
                      <th>Our Reg</th>
                      <th>MS %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rtoData.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{row.city}</td>
                        <td>{row.tiv}</td>
                        <td>{row.ourReg}</td>
                        <td>
                          <span className={`ms-badge ${row.ms > 10 ? 'green' : row.ms < 5 ? 'red' : 'neutral'}`}>
                            {row.ms}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="upload-section glass" onClick={() => fileInputRef.current.click()}>
          <div className="upload-content">
            <Icons.FileSpreadsheet size={48} color="var(--accent)" />
            <h3>Drop RTO Registration CSV here</h3>
            <span>Or click to browse from your computer</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1rem' }}>
              Format: City, TIV, Tata, Maruti, Hyundai, Others
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RTOMarketShare;
