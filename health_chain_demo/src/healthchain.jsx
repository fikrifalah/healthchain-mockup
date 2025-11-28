import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Activity, 
  ShieldCheck, 
  Search, 
  Bell, 
  Menu, 
  LogOut, 
  Database, 
  Key, 
  Clock, 
  ChevronDown,
  Pill,
  Hospital
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- Assets Import ---
// NOTE: Uncomment the line below when running in your local VS Code where the file exists!
import healthChainLogo from './assets/HEALTHCHAIN___1_-removebg-preview.png';

// For this live preview, we will use a placeholder so the code doesn't crash.


// --- Mock Data ---

const patientData = [
  { name: 'Mon', systolic: 120, diastolic: 80 },
  { name: 'Tue', systolic: 118, diastolic: 79 },
  { name: 'Wed', systolic: 122, diastolic: 82 },
  { name: 'Thu', systolic: 121, diastolic: 81 },
  { name: 'Fri', systolic: 119, diastolic: 78 },
  { name: 'Sat', systolic: 123, diastolic: 84 },
  { name: 'Sun', systolic: 120, diastolic: 80 },
];

const adminData = [
  { name: 'Mon', requests: 4000 },
  { name: 'Tue', requests: 3000 },
  { name: 'Wed', requests: 2000 },
  { name: 'Thu', requests: 2780 },
  { name: 'Fri', requests: 1890 },
  { name: 'Sat', requests: 2390 },
  { name: 'Sun', requests: 3490 },
];

const doctorData = [
  { name: 'Mon', patients: 12 },
  { name: 'Tue', patients: 19 },
  { name: 'Wed', patients: 15 },
  { name: 'Thu', patients: 22 },
  { name: 'Fri', patients: 18 },
  { name: 'Sat', patients: 10 },
  { name: 'Sun', patients: 5 },
];

// --- Custom Color ---
const BRAND_BLUE = '#67a7d8';

// --- Components ---

const StatCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 mb-2">{value}</h3>
      <p className={`text-sm font-medium flex items-center gap-1`}>
        <span style={{ color: change.includes('+') ? BRAND_BLUE : '#ef4444' }}>{change}</span>
        <span className="text-slate-400 font-normal">from yesterday</span>
      </p>
    </div>
    <div className={`p-4 rounded-2xl shadow-sm`} style={{ backgroundColor: `${BRAND_BLUE}20` }}> 
      {/* 20 is hex opacity ~12% */}
      <Icon size={24} style={{ color: BRAND_BLUE }} />
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${!active ? 'text-slate-500 hover:bg-slate-50' : 'text-white shadow-md'}`}
    style={active ? { backgroundColor: BRAND_BLUE } : {}}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

// --- Role Views ---

const PatientView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Active Consents" value="3" change="+1" icon={Key} />
      <StatCard title="Recent Vitals" value="Normal" change="+0.5%" icon={Activity} />
      <StatCard title="Total Records" value="128" change="+2" icon={FileText} />
      <StatCard title="Access Logs" value="12" change="+3" icon={ShieldCheck} />
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Health Trends (Blood Pressure)</h3>
        <select className="bg-slate-50 border-none text-sm text-slate-600 font-medium rounded-lg p-2 outline-none cursor-pointer">
          <option>Last 7 Days</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={patientData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Line type="monotone" dataKey="systolic" stroke={BRAND_BLUE} strokeWidth={3} dot={{r: 4, fill: BRAND_BLUE, strokeWidth: 2, stroke: '#fff'}} />
            <Line type="monotone" dataKey="diastolic" stroke="#94a3b8" strokeWidth={3} dot={{r: 4, fill: '#94a3b8', strokeWidth: 2, stroke: '#fff'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Data Access</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
              <th className="pb-4 pt-4 pl-4 font-semibold text-slate-500 rounded-l-lg">Provider Name</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Purpose</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Date - Time</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Duration</th>
              <th className="pb-4 pt-4 pr-4 font-semibold text-slate-500 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-medium text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>S</div>
                Siloam Hospitals
              </td>
              <td className="py-4 text-slate-600">Emergency Check</td>
              <td className="py-4 text-slate-600">Oct 24, 2025 - 14:30</td>
              <td className="py-4 text-slate-600">15 mins</td>
              <td className="py-4 pr-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>Authorized</span></td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-medium text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>K</div>
                Kimia Farma
              </td>
              <td className="py-4 text-slate-600">Prescription Fill</td>
              <td className="py-4 text-slate-600">Oct 22, 2025 - 09:15</td>
              <td className="py-4 text-slate-600">5 mins</td>
              <td className="py-4 pr-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>Verified</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const DoctorView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Today's Patients" value="18" change="+2" icon={Users} />
      <StatCard title="Pending Reviews" value="4" change="-1" icon={FileText} />
      <StatCard title="Verified Scripts" value="42" change="+8" icon={ShieldCheck} />
      <StatCard title="Emergency Cases" value="1" change="0" icon={Activity} />
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Patient Traffic Overview</h3>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={doctorData}>
            <defs>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BRAND_BLUE} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={BRAND_BLUE} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
            <Tooltip />
            <Area type="monotone" dataKey="patients" stroke={BRAND_BLUE} fillOpacity={1} fill="url(#colorPatients)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">Patient Queue & Records</h3>
        <button className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm" style={{ backgroundColor: BRAND_BLUE }}>
          + Request Access
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
              <th className="pb-4 pt-4 pl-4 font-semibold text-slate-500 rounded-l-lg">Patient Name</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Condition</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Last Visit</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Data Status</th>
              <th className="pb-4 pt-4 pr-4 font-semibold text-slate-500 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-medium text-slate-800">
                <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-8 h-8 rounded-full bg-slate-100" />
                  Budi Santoso
                </div>
              </td>
              <td className="py-4 text-slate-600">Hypertension</td>
              <td className="py-4 text-slate-600">Oct 10, 2025</td>
              <td className="py-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>On-Chain Verified</span></td>
              <td className="py-4 pr-4"><button className="font-medium hover:underline" style={{ color: BRAND_BLUE }}>View Record</button></td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-medium text-slate-800">
                <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" className="w-8 h-8 rounded-full bg-slate-100" />
                  Siti Aminah
                </div>
              </td>
              <td className="py-4 text-slate-600">Type 2 Diabetes</td>
              <td className="py-4 text-slate-600">Sep 28, 2025</td>
              <td className="py-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>On-Chain Verified</span></td>
              <td className="py-4 pr-4"><button className="font-medium hover:underline" style={{ color: BRAND_BLUE }}>View Record</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AdminView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="API Requests" value="40.6k" change="+8.5%" icon={Database} />
      <StatCard title="Connected Nodes" value="142" change="+12" icon={Hospital} />
      <StatCard title="Smart Contracts" value="890" change="+4.3%" icon={FileText} />
      <StatCard title="Compliance Alerts" value="2" change="-5%" icon={ShieldCheck} />
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">System Interoperability Load</h3>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={adminData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
            <Tooltip />
            <Line type="step" dataKey="requests" stroke={BRAND_BLUE} strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">Compliance & Audit Trail </h3>
        <button className="text-sm font-medium hover:underline" style={{ color: BRAND_BLUE }}>Download Report</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
              <th className="pb-4 pt-4 pl-4 font-semibold text-slate-500 rounded-l-lg">Transaction Hash</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Origin Node</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Action Type</th>
              <th className="pb-4 pt-4 font-semibold text-slate-500">Timestamp</th>
              <th className="pb-4 pt-4 pr-4 font-semibold text-slate-500 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-mono text-xs" style={{ color: BRAND_BLUE }}>0x8f...2a9d</td>
              <td className="py-4 text-slate-800">RS Cipto Mangunkusumo</td>
              <td className="py-4 text-slate-600">Update EMR</td>
              <td className="py-4 text-slate-600">Oct 24, 14:32:01</td>
              <td className="py-4 pr-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>Immutable</span></td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-mono text-xs" style={{ color: BRAND_BLUE }}>0x3c...9b1f</td>
              <td className="py-4 text-slate-800">Kimia Farma #204</td>
              <td className="py-4 text-slate-600">Drug Supply Chain</td>
              <td className="py-4 text-slate-600">Oct 24, 14:31:55</td>
              <td className="py-4 pr-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>Immutable</span></td>
            </tr>
             <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-4 pl-4 font-mono text-xs" style={{ color: BRAND_BLUE }}>0x1a...5d4e</td>
              <td className="py-4 text-slate-800">RS Santosa</td>
              <td className="py-4 text-slate-600">Unauthorized Access Attempt</td>
              <td className="py-4 text-slate-600">Oct 24, 14:30:10</td>
              <td className="py-4 pr-4"><span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold">Blocked</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- Main Layout ---

export default function HealthChainMockup() {
  const [role, setRole] = useState('patient'); // patient, doctor, admin
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = {
    patient: [
      { icon: LayoutDashboard, label: 'My Health' },
      { icon: Key, label: 'My Keys & Consent' },
      { icon: FileText, label: 'Medical Records' },
      { icon: Clock, label: 'Access History' },
      { icon: Users, label: 'My Providers' },
    ],
    doctor: [
      { icon: LayoutDashboard, label: 'Doctor Dashboard' },
      { icon: Users, label: 'My Patients' },
      { icon: Search, label: 'Search Records' },
      { icon: Pill, label: 'Prescriptions' },
      { icon: FileText, label: 'Verify Data' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Admin Overview' },
      { icon: Hospital, label: 'Node Management' },
      { icon: Users, label: 'User Roles' },
      { icon: ShieldCheck, label: 'Compliance Audit' },
      { icon: Database, label: 'API Integration' },
    ]
  };

  return (
    <div className="flex h-screen font-sans text-slate-900" style={{ backgroundColor: '#f0f6fa' }}>
      
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-full z-10 shadow-sm ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className={`p-6 flex items-center justify-center transition-all ${sidebarOpen ? 'gap-0' : 'gap-3'}`}>
          {/* Logo Section */}
          <div className={`flex-shrink-0 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? 'w-32' : 'w-10 h-10'}`}>
             <img 
              // UPDATED: Using the imported image variable
              src={healthChainLogo}
              alt="HealthChain Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems[role].map((item, index) => (
            <SidebarItem key={index} icon={item.icon} label={sidebarOpen ? item.label : ''} active={index === 0} />
          ))}
          
          <div className="my-6 border-t border-slate-100"></div>
          
          <SidebarItem icon={Settings} label={sidebarOpen ? 'Settings' : ''} />
          <SidebarItem icon={LogOut} label={sidebarOpen ? 'Logout' : ''} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm h-20 border-b border-slate-200 sticky top-0 z-20 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search records, hash, or ID..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': `${BRAND_BLUE}40`, borderColor: '#e2e8f0' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Role Switcher for Demo - UPDATED: Removed 'hidden' class to make it visible on all screens */}
            <div className="flex bg-slate-100/80 p-1 rounded-lg">
              {['patient', 'doctor', 'admin'].map((r) => (
                <button 
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${role === r ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  style={role === r ? { color: BRAND_BLUE } : {}}
                >
                  {r}
                </button>
              ))}
            </div>

            <button className="relative p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="profile" className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
              <div className="hidden md:block">
                <p className="text-sm font-bold text-slate-800 capitalize">{role === 'business' ? 'Hospital Admin' : role}</p>
                <p className="text-xs text-slate-500">HealthChain User</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 capitalize mb-2">{role} Dashboard</h1>
            <p className="text-slate-500">Welcome back to the secure HealthChain network.</p>
          </div>

          {role === 'patient' && <PatientView />}
          {role === 'doctor' && <DoctorView />}
          {role === 'admin' && <AdminView />}
          
        </div>
      </main>
    </div>
  );
}