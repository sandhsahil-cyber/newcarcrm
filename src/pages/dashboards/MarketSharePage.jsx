import React from 'react';
import Chart from 'react-apexcharts';
import * as Icons from 'lucide-react';
import RTOMarketShare from '../../components/RTOMarketShare';
import './BrandCEO.css';

const MarketSharePage = () => {
  const marketShareOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
      zoom: { enabled: false },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 0,
        blur: 4,
        opacity: 0.1,
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 8,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '12px',
              fontWeight: 700,
              color: '#94a3b8'
            }
          }
        }
      },
    },
    colors: ['#e66239', '#3b82f6', '#10b981', '#f59e0b'],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
      style: {
        fontSize: '11px',
        fontWeight: 600,
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: ['Rajkot', 'Ahmedabad', 'Morbi'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { 
        style: { 
          colors: '#94a3b8',
          fontSize: '12px',
          fontWeight: 500
        } 
      }
    },
    yaxis: {
      max: 100,
      labels: { 
        style: { 
          colors: '#94a3b8',
          fontSize: '12px'
        },
        formatter: (val) => `${val}%`
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '13px',
      fontWeight: 500,
      labels: { colors: '#94a3b8' },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: { horizontal: 15 }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 90, 100]
      }
    },
    theme: { mode: 'dark' },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.05)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => `${val}% Market Share` }
    }
  };

  const marketShareSeries = [
    { name: 'Tata Motors', data: [35, 28, 42] },
    { name: 'Maruti Suzuki', data: [25, 32, 18] },
    { name: 'Hyundai', data: [20, 25, 15] },
    { name: 'Mahindra & Others', data: [20, 15, 25] },
  ];

  return (
    <div className="ceo-dashboard">
      <div className="ceo-header">
        <div>
          <div className="breadcrumb">
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Strategic View</span>
            <Icons.ChevronRight size={12} style={{ margin: '0 8px', color: 'var(--text-dim)' }} />
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>Market Share Analysis</span>
          </div>
          <h1>Market Share Command Center</h1>
        </div>
        <div className="date-badge">
          <Icons.Calendar size={14} style={{ marginRight: 8 }} />
          {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="ceo-stats-grid">
        <div className="ceo-stat-card">
          <div className="ceo-stat-icon" style={{ background: 'rgba(230, 98, 57, 0.1)', color: '#e66239' }}>
            <Icons.TrendingUp size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Peak Market Share</span>
            <span className="ceo-stat-value">42%</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>In Morbi Cluster</span>
          </div>
        </div>
        <div className="ceo-stat-card">
          <div className="ceo-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Icons.Target size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Avg. Market Share</span>
            <span className="ceo-stat-value">35%</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Across All Markets</span>
          </div>
        </div>
        <div className="ceo-stat-card">
          <div className="ceo-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Icons.Award size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Dominant City</span>
            <span className="ceo-stat-value">Morbi</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Leading Competitors</span>
          </div>
        </div>
      </div>

      <div className="ceo-main-grid" style={{ gridTemplateColumns: '1fr', marginTop: '1.5rem' }}>
        <RTOMarketShare readOnly={true} />
      </div>

      <div className="ceo-main-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="ceo-chart-container">
          <div className="chart-header">
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Brand Comparison by Market</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 4 }}>
                Competitive landscape analysis across major RTO clusters
              </p>
            </div>
            <div className="ceo-stat-trend up" style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: 20 }}>
              <Icons.Globe size={14} style={{ color: '#10b981' }} />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Tata Motors leads in Morbi (42%)</span>
            </div>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <Chart 
              options={marketShareOptions} 
              series={marketShareSeries} 
              type="bar" 
              height={450} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSharePage;
