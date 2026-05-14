import React, { useState, useMemo, useEffect } from 'react';
import * as Icons from 'lucide-react';
import './DealSheet.css';

const DealSheet = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    model: '',
    variant: '',
    colour: '',
    date: new Date().toISOString().split('T')[0],
    chassisNo: '',
    makeYear: '',
    caName: '',
    fuelType: 'EV',
    exShowroom: 0,
    loanAmount: 0,
    advanceEmi: 0,
    processingCharges: 0,
    insurance: 0,
    accessories: 0,
    extendedWarranty: 0,
    fastag: 0,
    vasCoating: 0,
    municipalTaxToggle: false,
    discScheme: 0,
    discExchange: 0,
    discFocusGroup: 0,
    discSolarRooftop: 0,
    discFinance: 0,
    discRsSupport: 0,
    discOther: 0,
    discLoyaltyEV: 0,
    bookingRTGS: 0,
    financeAmount: 0,
    dp1: 0,
    dp2: 0,
    dp3: 0,
    dp4: 0,
    dp5: 0,
    oldVehicle: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
    }));
  };


  const calculations = useMemo(() => {
    const {
      exShowroom, loanAmount, discScheme, discExchange, discFocusGroup,
      discSolarRooftop, discFinance, discRsSupport, discOther, discLoyaltyEV,
      fuelType, municipalTaxToggle, advanceEmi, processingCharges, insurance,
      accessories, extendedWarranty, fastag, vasCoating, bookingRTGS,
      financeAmount, dp1, dp2, dp3, dp4, dp5, oldVehicle
    } = formData;

    const totalDiscount = discScheme + discExchange + discFocusGroup + discSolarRooftop + discFinance + discRsSupport + discOther + discLoyaltyEV;
    const netBilling = exShowroom - totalDiscount;
    const margin = exShowroom - loanAmount;

    // RTO Calculation
    let rto = 2500; // Default for EV
    if (fuelType === 'Petrol') rto = (netBilling / 1.29) * 0.06 + 4500;
    else if (fuelType === 'Diesel') rto = (netBilling / 1.48) * 0.06 + 4500;
    else if (fuelType === 'CNG') rto = (netBilling / 1.25) * 0.06 + 4500;

    // Municipal Tax
    let municipalTaxAmount = 0;
    if (municipalTaxToggle) {
      const rate = exShowroom >= 800000 ? 0.03 : 0.02;
      municipalTaxAmount = netBilling * rate;
    }

    // TCS
    const tcs = exShowroom >= 1000000 ? netBilling * 0.01 : 0;

    const totalAmount = margin + advanceEmi + processingCharges + rto + insurance + accessories + extendedWarranty + fastag + vasCoating + municipalTaxAmount + tcs;
    
    const onRoadPrice = netBilling + rto + insurance + accessories + extendedWarranty + vasCoating + municipalTaxAmount + fastag + tcs;

    const totalPayments = bookingRTGS + financeAmount + dp1 + dp2 + dp3 + dp4 + dp5 + oldVehicle;
    const diff = totalAmount - totalPayments;

    return {
      totalDiscount,
      netBilling,
      margin,
      rto,
      municipalTaxAmount,
      tcs,
      totalAmount,
      onRoadPrice,
      totalPayments,
      diff
    };
  }, [formData]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  const handlePrint = () => window.print();

  return (
    <div className="deal-sheet-container animate-fade-in">
      <div className="dealsheet-header glass">
        <div className="header-title-main">
          <Icons.FileSpreadsheet size={32} color="var(--accent)" />
          <h2>EV Deal Sheet Command Center</h2>
        </div>
        <div className="header-actions-main">
          <button className="btn-secondary-outline" onClick={() => window.location.reload()}>
            <Icons.RotateCcw size={18} /> Reset
          </button>
          <button className="btn-primary-action" onClick={handlePrint}>
            <Icons.Printer size={18} /> Generate PDF
          </button>
        </div>
      </div>


      {/* Top - Customer Info */}
      <section className="customer-info-section glass">
        <div className="form-grid-4">
          <div className="form-group">
            <label>Customer Name</label>
            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Enter full name" />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Punch EV" />
          </div>
          <div className="form-group">
            <label>Variant</label>
            <input type="text" name="variant" value={formData.variant} onChange={handleChange} placeholder="Selected variant" />
          </div>
          <div className="form-group">
            <label>Colour</label>
            <input type="text" name="colour" value={formData.colour} onChange={handleChange} placeholder="Exterior colour" />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Chassis No</label>
            <input type="text" name="chassisNo" value={formData.chassisNo} onChange={handleChange} placeholder="VIN / Chassis" />
          </div>
          <div className="form-group">
            <label>Make Year</label>
            <input type="text" name="makeYear" value={formData.makeYear} onChange={handleChange} placeholder="2024" />
          </div>
          <div className="form-group">
            <label>CA Name</label>
            <input type="text" name="caName" value={formData.caName} onChange={handleChange} placeholder="Sales Consultant" />
          </div>
          <div className="form-group">
            <label>Fuel Type</label>
            <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
              <option value="EV">EV</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
        </div>
      </section>

      <div className="dealsheet-main-grid mt-4">
        {/* LEFT COLUMN - Particulars */}
        <div className="left-column">
          <section className="section-card">
            <h3 className="section-title"><Icons.Info size={20} /> Particulars</h3>
            <div className="form-stack">
              <div className="row-input">
                <label>Ex-Showroom Price</label>
                <input type="number" name="exShowroom" value={formData.exShowroom} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Loan Amount</label>
                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
              </div>
              <div className="row-input readonly highlight">
                <label>Margin (Own Contribution)</label>
                <input type="text" value={formatCurrency(calculations.margin)} readOnly />
              </div>
              <div className="row-input">
                <label>(+) Advance EMI</label>
                <input type="number" name="advanceEmi" value={formData.advanceEmi} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(+) Doc / Processing Charges</label>
                <input type="number" name="processingCharges" value={formData.processingCharges} onChange={handleChange} />
              </div>
              <div className="row-input readonly">
                <label>(+) RTO Charges</label>
                <input type="text" value={formatCurrency(calculations.rto)} readOnly />
              </div>
              <div className="row-input">
                <label>(+) Insurance</label>
                <input type="number" name="insurance" value={formData.insurance} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(+) Accessories</label>
                <input type="number" name="accessories" value={formData.accessories} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(+) EW 4 & 5 Year</label>
                <input type="number" name="extendedWarranty" value={formData.extendedWarranty} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(+) Fastag Charges</label>
                <input type="number" name="fastag" value={formData.fastag} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(+) Coating / VAS</label>
                <input type="number" name="vasCoating" value={formData.vasCoating} onChange={handleChange} />
              </div>
              
              <div className="row-input-check">
                <div className="label-group">
                  <label className="toggle-switch">
                    <input type="checkbox" name="municipalTaxToggle" checked={formData.municipalTaxToggle} onChange={handleChange} />
                    <span className="slider"></span>
                  </label>
                  <span>(+) Municipal TAX {formData.municipalTaxToggle && <span className="small-hint">({formData.exShowroom >= 800000 ? '3%' : '2%'})</span>}</span>
                </div>
                <input type="text" className="readonly-input" style={{width: '160px', textAlign: 'right', background: 'transparent', border: 'none', color: 'var(--text-bright)', fontWeight: 600}} value={formatCurrency(calculations.municipalTaxAmount)} readOnly />
              </div>

              <div className="row-input readonly">
                <label>(+) TCS @ 1% {formData.exShowroom < 1000000 && <span className="small-hint">(Not applicable)</span>}</label>
                <input type="text" value={formatCurrency(calculations.tcs)} readOnly />
              </div>

              <div className="row-total">
                <label>TOTAL AMOUNT</label>
                <span className="total-val">{formatCurrency(calculations.totalAmount)}</span>
              </div>
            </div>
          </section>

          <section className="section-card mt-4">
            <h3 className="section-title"><Icons.Tag size={20} /> All Discounts</h3>
            <div className="form-stack">
              <div className="row-input">
                <label>(-) Discount SCHEME / G.B.</label>
                <input type="number" name="discScheme" value={formData.discScheme} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Discount EXCH BONUS</label>
                <input type="number" name="discExchange" value={formData.discExchange} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Discount FOCUS GROUP</label>
                <input type="number" name="discFocusGroup" value={formData.discFocusGroup} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Discount SOLAR ROOFTOP</label>
                <input type="number" name="discSolarRooftop" value={formData.discSolarRooftop} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Discount FINANCE</label>
                <input type="number" name="discFinance" value={formData.discFinance} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Discount RS SUPPORT SCHEME</label>
                <input type="number" name="discRsSupport" value={formData.discRsSupport} onChange={handleChange} />
              </div>
              <div className="row-input">
                <label>(-) Discount OTHER / EXTRA</label>
                <input type="number" name="discOther" value={formData.discOther} onChange={handleChange} />
              </div>
              <div className="row-total discount-total" style={{background: 'rgba(33, 150, 243, 0.1)', borderColor: '#2196f3'}}>
                <label style={{color: '#2196f3'}}>TOTAL DISCOUNT</label>
                <span className="total-val" style={{color: '#2196f3'}}>{formatCurrency(calculations.totalDiscount)}</span>
              </div>
              <div className="row-total highlight" style={{background: 'rgba(76, 175, 80, 0.1)', borderColor: '#4caf50'}}>
                <label style={{color: '#4caf50'}}>TOTAL RECEIVABLE AMOUNT</label>
                <span className="total-val" style={{color: '#4caf50'}}>{formatCurrency(calculations.totalAmount - calculations.totalDiscount)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - Payments & Summary */}
        <div className="right-column">
          <section className="section-card">
            <h3 className="section-title"><Icons.CreditCard size={20} /> Payment Breakdown</h3>
            <div className="payment-grid">
              <div className="form-stack">
                <div className="row-input">
                  <label>Booking RTGS</label>
                  <input type="number" name="bookingRTGS" value={formData.bookingRTGS} onChange={handleChange} />
                </div>
                <div className="row-input">
                  <label>Finance Amt</label>
                  <input type="number" name="financeAmount" value={formData.financeAmount} onChange={handleChange} />
                </div>
                <div className="row-input">
                  <label>DP 1 RTGS</label>
                  <input type="number" name="dp1" value={formData.dp1} onChange={handleChange} />
                </div>
                <div className="row-input">
                  <label>DP 2</label>
                  <input type="number" name="dp2" value={formData.dp2} onChange={handleChange} />
                </div>
              </div>
              <div className="form-stack">
                <div className="row-input">
                  <label>DP 3</label>
                  <input type="number" name="dp3" value={formData.dp3} onChange={handleChange} />
                </div>
                <div className="row-input">
                  <label>DP 4</label>
                  <input type="number" name="dp4" value={formData.dp4} onChange={handleChange} />
                </div>
                <div className="row-input">
                  <label>DP 5</label>
                  <input type="number" name="dp5" value={formData.dp5} onChange={handleChange} />
                </div>
                <div className="row-input">
                  <label>Old Vehicle</label>
                  <input type="number" name="oldVehicle" value={formData.oldVehicle} onChange={handleChange} />
                </div>
              </div>
            </div>
            
            <div className="row-total mt-4">
              <label>TOTAL RECEIVED</label>
              <span className="total-val">{formatCurrency(calculations.totalPayments)}</span>
            </div>

            <div className={`diff-display ${calculations.diff > 0 ? 'negative' : 'positive'}`}>
              {calculations.diff > 0 ? `Shortfall: ${formatCurrency(calculations.diff)}` : `Surplus: ${formatCurrency(Math.abs(calculations.diff))}`}
            </div>
          </section>

          <section className="receipt-summary mt-4">
            <h3 className="section-title" style={{color: 'white'}}><Icons.FileCheck2 size={20} /> Receipt Summary</h3>
            <div className="summary-list">
              <div className="summary-item"><span>Net Billing Amount:</span> <span className="val">{formatCurrency(calculations.netBilling)}</span></div>
              <div className="summary-item"><span>RTO Charges:</span> <span className="val">{formatCurrency(calculations.rto)}</span></div>
              <div className="summary-item"><span>Insurance:</span> <span className="val">{formatCurrency(formData.insurance)}</span></div>
              <div className="summary-item"><span>Accessories:</span> <span className="val">{formatCurrency(formData.accessories)}</span></div>
              <div className="summary-item"><span>EW (Ext. Warranty):</span> <span className="val">{formatCurrency(formData.extendedWarranty)}</span></div>
              <div className="summary-item"><span>VAS / Coating:</span> <span className="val">{formatCurrency(formData.vasCoating)}</span></div>
              <div className="summary-item"><span>Municipal Tax:</span> <span className="val">{formatCurrency(calculations.municipalTaxAmount)}</span></div>
              <div className="summary-item"><span>Fastag:</span> <span className="val">{formatCurrency(formData.fastag)}</span></div>
              <div className="summary-item"><span>TCS @ 1%:</span> <span className="val">{formatCurrency(calculations.tcs)}</span></div>
              
              <div className="summary-item grand-total">
                <span>ON ROAD PRICE:</span>
                <span className="val">{formatCurrency(calculations.onRoadPrice)}</span>
              </div>
            </div>
          </section>

          <div className="signature-section">
            <div className="sig-box">Authorised Signature</div>
            <div className="sig-box">Consultant Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealSheet;
