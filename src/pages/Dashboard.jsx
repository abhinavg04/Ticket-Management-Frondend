import { useState } from 'react';

import {
  Server,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Wifi,
  Shield,
  FileText,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sample data - replace with real API data
  const stats = {
    totalTickets: 1247,
    openTickets: 342,
    inProgress: 156,
    resolved: 749,
    avgResolutionTime: '4.2h',
    criticalIssues: 23
  };


  const recentTickets = [
    {
      id: 'TKT-2891',
      title: 'Network Outage - Building A',
      priority: 'Critical',
      status: 'In Progress',
      assignee: 'John Smith',
      time: '15 min ago',
      category: 'Infrastructure'
    },
    {
      id: 'TKT-2890',
      title: 'VPN Connection Issues',
      priority: 'High',
      status: 'Open',
      assignee: 'Sarah Chen',
      time: '1 hour ago',
      category: 'Security'
    },
    {
      id: 'TKT-2889',
      title: 'Slow DNS Resolution',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Mike Johnson',
      time: '2 hours ago',
      category: 'DNS'
    },
    {
      id: 'TKT-2888',
      title: 'Firewall Rule Update',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'Emily Davis',
      time: '3 hours ago',
      category: 'Security'
    },
    {
      id: 'TKT-2887',
      title: 'Bandwidth Throttling Issue',
      priority: 'High',
      status: 'Open',
      assignee: 'Tom Wilson',
      time: '5 hours ago',
      category: 'Performance'
    }
  ];

  const categoryData = [
    { name: 'Infrastructure', count: 342, percentage: 27.4, color: 'bg-cyan-500' },
    { name: 'Security', count: 298, percentage: 23.9, color: 'bg-emerald-500' },
    { name: 'Performance', count: 245, percentage: 19.6, color: 'bg-blue-500' },
    { name: 'DNS', count: 187, percentage: 15.0, color: 'bg-purple-500' },
    { name: 'Other', count: 175, percentage: 14.1, color: 'bg-gray-500' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'in progress': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'resolved': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-custom p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Tickets */}
        <div className="stat-card rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-cyan-500/20">
              <FileText size={24} className="text-cyan-400" />
            </div>
            <TrendingUp size={20} className="text-emerald-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {stats.totalTickets}
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Total Tickets
          </p>
        </div>

        {/* Open Tickets */}
        <div className="stat-card rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <AlertCircle size={24} className="text-yellow-400" />
            </div>
            <TrendingUp size={20} className="text-yellow-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {stats.openTickets}
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Open Tickets
          </p>
        </div>

        {/* In Progress */}
        <div className="stat-card rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Activity size={24} className="text-blue-400" />
            </div>
            <TrendingDown size={20} className="text-red-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {stats.inProgress}
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            In Progress
          </p>
        </div>

        {/* Resolved */}
        <div className="stat-card rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-emerald-500/20">
              <CheckCircle2 size={24} className="text-emerald-400" />
            </div>
            <TrendingUp size={20} className="text-emerald-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {stats.resolved}
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Resolved
          </p>
        </div>

        {/* Avg Resolution Time */}
        <div className="stat-card rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Clock size={24} className="text-purple-400" />
            </div>
            <TrendingDown size={20} className="text-emerald-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {stats.avgResolutionTime}
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Avg Resolution
          </p>
        </div>

        {/* Critical Issues */}
        <div className="stat-card rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <Shield size={24} className="text-red-400" />
            </div>
            <TrendingUp size={20} className="text-red-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {stats.criticalIssues}
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Critical Issues
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="lg:col-span-2 bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Recent Tickets
            </h2>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1" style={{ fontFamily: 'Space Mono, monospace' }}>
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {recentTickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className="ticket-row p-4 rounded-lg bg-[#151b2e] border border-cyan-500/20"
                style={{ animationDelay: `${0.45 + index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-cyan-400 font-semibold" style={{ fontFamily: 'Space Mono, monospace' }}>
                        {ticket.id}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(ticket.priority)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(ticket.status)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                      {ticket.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {ticket.assignee}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {ticket.time}
                      </span>
                      <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs">
                        {ticket.category}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.45s' }}>
          <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Tickets by Category
          </h2>

          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {category.name}
                  </span>
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {category.count}
                  </span>
                </div>
                <div className="relative h-2 bg-[#151b2e] rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${category.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Network Status Indicator */}
          <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-semibold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                System Status: Operational
              </span>
            </div>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Space Mono, monospace' }}>
              <div className="flex justify-between text-gray-400">
                <span>Uptime</span>
                <span className="text-emerald-400">99.98%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Response Time</span>
                <span className="text-cyan-400">124ms</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Active Connections</span>
                <span className="text-white">2,847</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <Wifi size={20} className="text-cyan-400" />
            </div>
            <h3 className="font-semibold text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
              Network Health
            </h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            98.5%
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            <TrendingUp size={16} />
            <span>+2.3% from last week</span>
          </div>
        </div>

        <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.55s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Activity size={20} className="text-emerald-400" />
            </div>
            <h3 className="font-semibold text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
              Bandwidth Usage
            </h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            76%
          </div>
          <div className="flex items-center gap-2 text-sm text-yellow-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            <TrendingUp size={16} />
            <span>Peak hours: 2-5 PM</span>
          </div>
        </div>

        <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Shield size={20} className="text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
              Security Score
            </h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            94/100
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            <TrendingUp size={16} />
            <span>Excellent rating</span>
          </div>
        </div>

        <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 animate-slide-in-up" style={{ animationDelay: '0.65s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Server size={20} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
              Server Load
            </h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            42%
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            <TrendingDown size={16} />
            <span>Optimal performance</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;