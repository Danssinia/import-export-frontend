import { ArrowDownRight, CheckCircle, Clock, Package } from "lucide-react"

//to be replaced with the original data
const stats = [
    {label: "Total Shipments", value:"1,248", change:"+12%", icon:Package, color:"bg-blue-500"},
    {label: "In Transit", value:"342", change:"+5%", icon:Clock, color:"bg-amber-500"},
    {label: "Delivered", value:"856", change:"+18%", icon:CheckCircle, color:"bg-emerald-500"},
    {label: "Pending Customs", value:"50", change:"-2%", icon:ArrowDownRight, color:"bg-rose-500"}
]

const recentShipments = [
  { id: "SH-001", origin: "Shanghai, CN", destination: "Addis Ababa, ET", status: "In Transit", date: "2023-10-24" },
  { id: "SH-002", origin: "Hamburg, DE", destination: "Hawassa, ET", status: "Customs", date: "2023-10-23" },
  { id: "SH-003", origin: "Tokyo, JP", destination: "Bahirdar, ET", status: "Delivered", date: "2023-10-22" },
  { id: "SH-004", origin: "London, UK", destination: "Nazreth, ET", status: "Pending", date: "2023-10-21" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-100 text-emerald-800";
    case "In Transit": return "bg-blue-100 text-blue-800";
    case "Customs": return "bg-amber-100 text-amber-800";
    default: return "bg-gray-100 text-gray-800";
  }
};


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening with your shipments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat)=>(
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                   <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                   </div>

                   <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-','text-')}`}/>
                    </div> 
                </div>

                <div className="mt-4 flex items-center text-sm space-x-2">
                  <span className={stat.change.startsWith("+") ? "text-emerald-600": "text-rose-600"}>
                    {stat.change}
                  </span>
                  <span className="text-gray-400 ml2"> from last month</span>
                </div>
            </div>
        ))}
      </div>

      {/* Recent Shipments Table */}
     <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Shipments</h2>
        <button className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-medium transition-colors">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Shipment ID</th>
              <th className="px-6 py-3 font-medium">Origin</th>
              <th className="px-6 py-3 font-medium">Destination</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentShipments.map((recent)=>(
              <tr key={recent.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{recent.id}</td>
              <td className="px-6 py-4 text-gray-600">{recent.origin}</td>
              <td className="px-6 py-4 text-gray-600">{recent.destination}</td>
              <td className="px-6 py-4 text-gray-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(recent.status)}`}>
                  {recent.status}
                </span>
                </td>
              <td className="px-6 py-4 text-gray-600">{recent.date}</td>
            </tr>
            ))
            }
          </tbody>
        </table>
      </div>
     </div>

    </div>
  )
}
