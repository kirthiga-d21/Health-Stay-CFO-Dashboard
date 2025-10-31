const { useState } = React;
const { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } = window.Recharts || {};
const { TrendingUp, TrendingDown, DollarSign, Briefcase, Activity, AlertCircle, ArrowUp, ArrowDown } = window.lucide || {};

function CFODashboard() {
  const [selectedMonth, setSelectedMonth] = useState('SEP');

  // Financial Data - 12 months historical
  const monthData = [
    { month: 'JAN', revenue: 6000, expenses: 190096 },
    { month: 'FEB', revenue: 6000, expenses: 190096 },
    { month: 'MAR', revenue: 6000, expenses: 190096 },
    { month: 'APR', revenue: 6000, expenses: 190096 },
    { month: 'MAY', revenue: 6000, expenses: 177318 },
    { month: 'JUN', revenue: 6000, expenses: 257494 },
    { month: 'JUL', revenue: 8500, expenses: 242156 },
    { month: 'AUG', revenue: 10200, expenses: 235847 },
    { month: 'SEP', revenue: 12800, expenses: 248923 }
  ];

  const profitData = [
    { month: 'JAN', profit: -184096 },
    { month: 'FEB', profit: -184096 },
    { month: 'MAR', profit: -184096 },
    { month: 'APR', profit: -184096 },
    { month: 'MAY', profit: -171318 },
    { month: 'JUN', profit: -251494 },
    { month: 'JUL', profit: -233656 },
    { month: 'AUG', profit: -225647 },
    { month: 'SEP', profit: -236123 }
  ];

  const burnRateData = [
    { month: 'JAN', burnRate: 184096 },
    { month: 'FEB', burnRate: 184096 },
    { month: 'MAR', burnRate: 184096 },
    { month: 'APR', burnRate: 184096 },
    { month: 'MAY', burnRate: 171318 },
    { month: 'JUN', burnRate: 251494 },
    { month: 'JUL', burnRate: 233656 },
    { month: 'AUG', burnRate: 225647 },
    { month: 'SEP', burnRate: 236123 }
  ];

  const expenseCategories = [
    { name: 'Wages & Salaries', value: 161216 },
    { name: 'Website & Ops', value: 70786 },
    { name: 'Consulting', value: 5824 },
    { name: 'Subscriptions', value: 5023 },
    { name: 'Others', value: 14645 }
  ];

  const ratiosTrend = [
    { month: 'JUL', current: 3.8, quick: 1.4, debt: 0.04 },
    { month: 'AUG', current: 3.95, quick: 1.42, debt: 0.038 },
    { month: 'SEP', current: 4.1, quick: 1.45, debt: 0.035 }
  ];

  const EXPENSE_COLORS = ['#0ea5e9', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'];

  const StatCard = ({ title, value, change, target, isNegative = false }) => {
    const isPositive = change > 0;
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">{title}</p>
            <p className={`text-3xl font-bold mt-2 ${isNegative ? 'text-red-600' : 'text-gray-900'}`}>
              Dhs {(value / 1000).toFixed(1)}k
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isNegative ? 'bg-red-100' : 'bg-blue-100'}`}>
            <div className={`w-6 h-6 ${isNegative ? 'text-red-600' : 'text-blue-600'}`}></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {isPositive ? (
              <span className="text-green-600 font-semibold text-sm">↑ {Math.abs(change).toFixed(1)}%</span>
            ) : (
              <span className="text-red-600 font-semibold text-sm">↓ {Math.abs(change).toFixed(1)}%</span>
            )}
          </div>
          <span className="text-gray-500 text-xs">vs Previous Period</span>
        </div>
        {target && <p className="text-xs text-gray-500 mt-3 border-t pt-2">Target: Dhs {(target / 1000).toFixed(0)}k</p>}
      </div>
    );
  };

  const RatioCard = ({ title, value, label, trend = 0 }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-5 border-t-4 border-blue-500 hover:shadow-lg transition-all">
      <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-3">{title}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-blue-600">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
        <div className={`flex items-center gap-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="text-xs font-semibold">{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );

  const ChartBox = ({ title, children, subtitle = '' }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="mb-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Healthstay</h1>
            <p className="text-gray-600 text-lg">CFO Monthly Dashboard</p>
            <p className="text-gray-500 text-sm mt-2">December 2024 - December 2025 | Last Updated: Oct 27, 2025</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-t-4 border-blue-600">
            <p className="text-gray-600 text-xs font-semibold uppercase">Selected Period</p>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mt-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="JUL">Jul-25</option>
              <option value="AUG">Aug-25</option>
              <option value="SEP">Sep-25</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <StatCard 
            title="Total Revenue" 
            value={12800} 
            change={25.5}
            target={110000}
          />
          <StatCard 
            title="Operating Expenses" 
            value={248923} 
            change={-3.8}
            isNegative={true}
          />
          <StatCard 
            title="Net Loss" 
            value={-236123} 
            change={4.2}
            isNegative={true}
          />
          <StatCard 
            title="Total Assets" 
            value={920157} 
            change={10.4}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <ChartBox title="Revenue & Expenses Trend" subtitle="12-month historical comparison">
          <p className="text-gray-600 text-center py-8">Chart renders in browser</p>
        </ChartBox>
        <ChartBox title="Net Profit/Loss Trend" subtitle="Monthly performance tracking">
          <p className="text-gray-600 text-center py-8">Chart renders in browser</p>
        </ChartBox>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <ChartBox title="Monthly Burn Rate" subtitle="Cash consumption by month">
          <p className="text-gray-600 text-center py-8">Chart renders in browser</p>
        </ChartBox>
        <ChartBox title="Expense Distribution (September 2025)" subtitle="Breakdown by major categories">
          <p className="text-gray-600 text-center py-8">Chart renders in browser</p>
        </ChartBox>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <ChartBox title="Financial Ratios Trend" subtitle="Liquidity and leverage analysis">
          <p className="text-gray-600 text-center py-8">Chart renders in browser</p>
        </ChartBox>
        <ChartBox title="Balance Sheet Details" subtitle="September 2025">
          <div className="space-y-4 py-2">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Receivables & Payables</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm text-gray-700">Accounts Receivable</span>
                  <span className="font-bold text-blue-600">Dhs 28.5k</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="text-sm text-gray-700">Accounts Payable</span>
                  <span className="font-bold text-red-600">Dhs 35.8k</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Key Items</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm text-gray-700">Cash on Hand</span>
                  <span className="font-bold text-green-600">Dhs 485.2k</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm text-gray-700">Prepayments</span>
                  <span className="font-bold text-orange-600">Dhs 16.8k</span>
                </div>
              </div>
            </div>
          </div>
        </ChartBox>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <RatioCard title="Current Ratio" value="4.10" label="Liquidity Health" trend={8} />
        <RatioCard title="Quick Ratio" value="1.45" label="Immediate Solvency" trend={3} />
        <RatioCard title="Debt-to-Equity" value="3.5%" label="Conservative leverage" trend={-12} />
        <RatioCard title="Cash Runway" value="5.2 Mo" label="At current burn rate" trend={15} />
      </div>

      <div className="text-center text-gray-500 text-xs">
        <p>Healthstay CFO Dashboard | Data Current as of October 27, 2025 | For Authorized Use Only</p>
      </div>
    </div>
  );
}

ReactDOM.render(<CFODashboard />, document.getElementById('root'));
