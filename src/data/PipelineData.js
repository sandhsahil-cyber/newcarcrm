export const PIPELINE_LEADS = [
  { id: 'LD-1001', name: 'John Doe', vehicle: 'SUV XC90', status: 'Pending', date: '2026-05-12', salesman: 'Rahul S.', team: 'Alpha', department: 'finance' },
  { id: 'LD-1002', name: 'Sarah Smith', vehicle: 'Sedan S60', status: 'In Review', date: '2026-05-11', salesman: 'Rahul S.', team: 'Alpha', department: 'rto' },
  { id: 'LD-1003', name: 'Mike Johnson', vehicle: 'EV Recharge', status: 'Approved', date: '2026-05-10', salesman: 'Rahul S.', team: 'Alpha', department: 'insurance' },
  { id: 'LD-1004', name: 'James Wilson', vehicle: 'SUV XC40', status: 'Pending', date: '2026-05-12', salesman: 'Anjali G.', team: 'Alpha', department: 'finance' },
  { id: 'LD-1005', name: 'Emma Brown', vehicle: 'Sedan S90', status: 'Approved', date: '2026-05-11', salesman: 'Anjali G.', team: 'Alpha', department: 'accounts' },
  { id: 'LD-1006', name: 'David Lee', vehicle: 'EV C40', status: 'Pending', date: '2026-05-09', salesman: 'Siddharth M.', team: 'Beta', department: 'finance' },
  { id: 'LD-1007', name: 'Lisa Chen', vehicle: 'SUV XC60', status: 'In Review', date: '2026-05-08', salesman: 'Siddharth M.', team: 'Beta', department: 'rto' },
  { id: 'LD-1008', name: 'Robert Fox', vehicle: 'Sedan S60', status: 'Approved', date: '2026-05-07', salesman: 'Kavita R.', team: 'Beta', department: 'accessories' },
  { id: 'LD-1009', name: 'Sophie Taylor', vehicle: 'SUV XC90', status: 'Pending', date: '2026-05-13', salesman: 'Rahul S.', team: 'Alpha', department: 'accessories' },
  { id: 'LD-1010', name: 'Oliver Platt', vehicle: 'EV Recharge', status: 'Pending', date: '2026-05-14', salesman: 'Amit Sharma', team: 'Gamma', department: 'finance' },
  { id: 'LD-1011', name: 'Kevin Hart', vehicle: 'SUV XC90', status: 'Pending', date: '2026-05-15', salesman: 'Rahul S.', team: 'Alpha', department: 'pdi', 
    pdiDetails: {
      customerName: 'SAPARA VALJIBHAI PARBATBHAI',
      vehicleModel: 'PUNCH SMART',
      colour: 'COORGE CLOUD',
      fuelType: 'Cng',
      chasisNumber: '69808',
      registerNo: 'GJ-01-AB-1234',
      invoiceNo: 'INV-2026-001',
      accessories: 'yes',
      deliveryDate: '2026-05-16',
      deliveryTime: '15:00',
      tlName: 'RAMDEVSINH',
      caName: 'GAUTAM SOLANKI',
      deliveryLocation: 'mavdi SHOWROOM',
      remark: 'Check tyre pressure carefully'
    }
  },
  { id: 'LD-1012', name: 'James Corden', vehicle: 'Sedan S60', status: 'Inspecting', date: '2026-05-15', salesman: 'Anjali G.', team: 'Alpha', department: 'pdi',
    pdiDetails: {
      customerName: 'JAMES CORDEN',
      vehicleModel: 'VOLVO S60',
      colour: 'Onyx Black',
      fuelType: 'Petrol',
      chasisNumber: '74221',
      registerNo: 'GJ-01-XY-5678',
      invoiceNo: 'INV-2026-002',
      accessories: 'no',
      deliveryDate: '2026-05-17',
      deliveryTime: '11:00',
      tlName: 'VIKRAM RATHOD',
      caName: 'SNEHA PATEL',
      deliveryLocation: 'GONDAL ROAD SHOWROOM',
      remark: 'Interior cleaning required'
    }
  },
  { id: 'LD-1013', name: 'Will Smith', vehicle: 'EV C40', status: 'Ready', date: '2026-05-14', salesman: 'Siddharth M.', team: 'Beta', department: 'pdi',
    pdiDetails: {
      customerName: 'WILL SMITH',
      vehicleModel: 'VOLVO C40 RECHARGE',
      colour: 'Crystal White',
      fuelType: 'EV',
      chasisNumber: '88902',
      registerNo: 'GJ-01-EE-9999',
      invoiceNo: 'INV-2026-003',
      accessories: 'yes',
      deliveryDate: '2026-05-15',
      deliveryTime: '18:00',
      tlName: 'RAMDEVSINH',
      caName: 'GAUTAM SOLANKI',
      deliveryLocation: 'mavdi SHOWROOM',
      remark: 'Charging to 100% completed'
    }
  },
  { id: 'LD-1014', name: 'Anil Ambani', vehicle: 'SUV XC90', status: 'Pending', date: '2026-05-16', salesman: 'Amit Sharma', team: 'Gamma', department: 'insurance',
    insuranceDetails: {
      insurer: 'Tata AIG',
      policyType: 'Comprehensive',
      premiumAmount: '68,500',
      policyNumber: '',
      term: '1 Year'
    }
  },
  { id: 'LD-1015', name: 'Rajesh Patel', vehicle: 'Sedan S60', status: 'In Review', date: '2026-05-15', salesman: 'Anjali G.', team: 'Alpha', department: 'insurance',
    insuranceDetails: {
      insurer: 'HDFC Ergo',
      policyType: 'Comprehensive',
      premiumAmount: '42,000',
      policyNumber: 'POL-HDFC-9921',
      term: '1 Year'
    }
  },
  { id: 'LD-1016', name: 'Kushal Shah', vehicle: 'EV Recharge', status: 'Approved', date: '2026-05-14', salesman: 'Siddharth M.', team: 'Beta', department: 'insurance',
    insuranceDetails: {
      insurer: 'ICICI Lombard',
      policyType: 'Zero Depreciation',
      premiumAmount: '55,000',
      policyNumber: 'POL-ICICI-1102',
      term: '1 Year'
    }
  },
];

export const MOCK_USER = {
  name: 'Rahul S.',
  team: 'Alpha'
};
