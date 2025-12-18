import React, { useState } from 'react';
import {
  Server,
  Search,
  Filter,
  Download,
  Plus,
  X,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  Activity,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  MessageSquare,
  Paperclip,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';

const AssignedTickets = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Sample tickets data - replace with your API data
  const allTickets = [
    {
      id: 'TKT-2891',
      title: 'Network Outage - Building A',
      description: 'Complete network outage affecting all floors in Building A. Multiple users unable to connect to any network resources.',
      priority: 'Critical',
      status: 'In Progress',
      category: 'Infrastructure',
      assignee: 'John Smith',
      reporter: 'Sarah Johnson',
      created: '2024-12-16 09:15 AM',
      updated: '2024-12-16 10:30 AM',
      dueDate: '2024-12-16 02:00 PM',
      comments: 12,
      attachments: 3,
      tags: ['Network', 'Outage', 'P1']
    },
    {
      id: 'TKT-2890',
      title: 'VPN Connection Issues',
      description: 'Users reporting intermittent VPN connection drops. Affects remote workers trying to access internal resources.',
      priority: 'High',
      status: 'Open',
      category: 'Security',
      assignee: 'Sarah Chen',
      reporter: 'Mike Wilson',
      created: '2024-12-16 08:30 AM',
      updated: '2024-12-16 08:45 AM',
      dueDate: '2024-12-16 05:00 PM',
      comments: 5,
      attachments: 1,
      tags: ['VPN', 'Security', 'Remote']
    },
    {
      id: 'TKT-2889',
      title: 'Slow DNS Resolution',
      description: 'DNS queries taking longer than usual. Users experiencing delays when accessing external websites.',
      priority: 'Medium',
      status: 'In Progress',
      category: 'DNS',
      assignee: 'Mike Johnson',
      reporter: 'Emily Davis',
      created: '2024-12-16 07:45 AM',
      updated: '2024-12-16 09:20 AM',
      dueDate: '2024-12-17 12:00 PM',
      comments: 8,
      attachments: 2,
      tags: ['DNS', 'Performance']
    },
    {
      id: 'TKT-2888',
      title: 'Firewall Rule Update Request',
      description: 'Need to update firewall rules to allow new application traffic. Request includes port 8443 for HTTPS alternative.',
      priority: 'Low',
      status: 'Resolved',
      category: 'Security',
      assignee: 'Emily Davis',
      reporter: 'Tom Brown',
      created: '2024-12-15 02:30 PM',
      updated: '2024-12-15 04:15 PM',
      dueDate: '2024-12-18 05:00 PM',
      comments: 3,
      attachments: 1,
      tags: ['Firewall', 'Security']
    },
    {
      id: 'TKT-2887',
      title: 'Bandwidth Throttling Issue',
      description: 'Users in Marketing department experiencing slow download speeds. Bandwidth appears to be throttled.',
      priority: 'High',
      status: 'Open',
      category: 'Performance',
      assignee: 'Tom Wilson',
      reporter: 'Lisa Anderson',
      created: '2024-12-16 06:00 AM',
      updated: '2024-12-16 06:15 AM',
      dueDate: '2024-12-16 06:00 PM',
      comments: 2,
      attachments: 0,
      tags: ['Bandwidth', 'QoS']
    },
    {
      id: 'TKT-2886',
      title: 'Switch Port Configuration',
      description: 'Need to configure additional ports on core switch for new devices. VLAN assignment required.',
      priority: 'Medium',
      status: 'Open',
      category: 'Infrastructure',
      assignee: 'John Smith',
      reporter: 'David Lee',
      created: '2024-12-15 03:45 PM',
      updated: '2024-12-15 03:45 PM',
      dueDate: '2024-12-17 05:00 PM',
      comments: 1,
      attachments: 2,
      tags: ['Switch', 'VLAN']
    },
    {
      id: 'TKT-2885',
      title: 'WiFi Dead Zones in Building C',
      description: 'Multiple dead zones reported on 3rd floor. Signal strength insufficient for reliable connectivity.',
      priority: 'High',
      status: 'In Progress',
      category: 'Infrastructure',
      assignee: 'Sarah Chen',
      reporter: 'James White',
      created: '2024-12-15 11:20 AM',
      updated: '2024-12-16 08:00 AM',
      dueDate: '2024-12-17 12:00 PM',
      comments: 15,
      attachments: 5,
      tags: ['WiFi', 'Coverage']
    },
    {
      id: 'TKT-2884',
      title: 'Scheduled Maintenance - Core Router',
      description: 'Planned maintenance window for firmware upgrade on core router. Expected downtime: 30 minutes.',
      priority: 'Medium',
      status: 'Scheduled',
      category: 'Maintenance',
      assignee: 'Mike Johnson',
      reporter: 'System Admin',
      created: '2024-12-14 10:00 AM',
      updated: '2024-12-15 02:00 PM',
      dueDate: '2024-12-20 02:00 AM',
      comments: 4,
      attachments: 1,
      tags: ['Maintenance', 'Router']
    },
    {
      id: 'TKT-2883',
      title: 'DHCP Pool Exhaustion Warning',
      description: 'DHCP pool nearing capacity. Only 15% of IP addresses available. Need to expand pool or reclaim unused addresses.',
      priority: 'Medium',
      status: 'Open',
      category: 'Infrastructure',
      assignee: 'Tom Wilson',
      reporter: 'Monitoring System',
      created: '2024-12-16 05:30 AM',
      updated: '2024-12-16 05:30 AM',
      dueDate: '2024-12-18 12:00 PM',
      comments: 0,
      attachments: 0,
      tags: ['DHCP', 'IP Management']
    },
    {
      id: 'TKT-2882',
      title: 'SSL Certificate Renewal',
      description: 'SSL certificate for internal web portal expiring in 14 days. Renewal and deployment required.',
      priority: 'High',
      status: 'Open',
      category: 'Security',
      assignee: 'Emily Davis',
      reporter: 'Security Scanner',
      created: '2024-12-15 09:00 AM',
      updated: '2024-12-15 09:00 AM',
      dueDate: '2024-12-25 11:59 PM',
      comments: 2,
      attachments: 1,
      tags: ['SSL', 'Certificate']
    },
    {
      id: 'TKT-2881',
      title: 'Load Balancer Health Check Failures',
      description: 'Backend servers failing health checks intermittently. Affecting application availability.',
      priority: 'Critical',
      status: 'In Progress',
      category: 'Infrastructure',
      assignee: 'John Smith',
      reporter: 'Emma Garcia',
      created: '2024-12-16 07:00 AM',
      updated: '2024-12-16 09:45 AM',
      dueDate: '2024-12-16 01:00 PM',
      comments: 18,
      attachments: 4,
      tags: ['Load Balancer', 'Health Check']
    },
    {
      id: 'TKT-2880',
      title: 'Network Printer Connectivity',
      description: 'Network printers on 2nd floor not responding. Users unable to print documents.',
      priority: 'Medium',
      status: 'Resolved',
      category: 'Infrastructure',
      assignee: 'Sarah Chen',
      reporter: 'Robert Taylor',
      created: '2024-12-15 01:15 PM',
      updated: '2024-12-15 03:30 PM',
      dueDate: '2024-12-15 05:00 PM',
      comments: 6,
      attachments: 0,
      tags: ['Printer', 'Network']
    }
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
      case 'scheduled': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
      case 'high':
        return <AlertCircle size={16} />;
      case 'medium':
        return <Activity size={16} />;
      case 'low':
        return <CheckCircle2 size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  const filterTickets = () => {
    return allTickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = selectedPriority === 'all' || ticket.priority.toLowerCase() === selectedPriority.toLowerCase();
      const matchesStatus = selectedStatus === 'all' || ticket.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesPriority && matchesStatus;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.created) - new Date(b.created);
      } else if (sortBy === 'priority') {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        comparison = priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()];
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const filteredTickets = filterTickets();

  const stats = {
    total: allTickets.length,
    open: allTickets.filter(t => t.status === 'Open').length,
    inProgress: allTickets.filter(t => t.status === 'In Progress').length,
    resolved: allTickets.filter(t => t.status === 'Resolved').length
  };

  return (
    <div className="flex-1 scrollbar-custom p-6">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght:400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .ticket-card {
          transition: all 0.3s ease;
        }

        .ticket-card:hover {
          transform: translateY(-2px);
          background: rgba(6, 182, 212, 0.05);
          border-left: 3px solid #06b6d4;
          padding-left: 21px;
        }

        .filter-button {
          transition: all 0.3s ease;
        }

        .filter-button:hover {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.5);
        }

        .filter-button.active {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2));
          border-color: #06b6d4;
        }

        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }

        .modal-backdrop {
          backdrop-filter: blur(8px);
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      {/* Animated background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto scrollbar-custom">
        {/* Header */}
        <div className="mb-8 animate-slide-in-up">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TICKETS MANAGEMENT
              </h1>
              <p className="text-gray-400 mt-1" style={{ fontFamily: 'Space Mono, monospace' }}>
                Track and manage all network operations tickets
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Total Tickets</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Activity size={24} className="text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-4 animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Open</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stats.open}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle size={24} className="text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-orange-500/20 rounded-xl p-4 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>In Progress</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Clock size={24} className="text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-4 animate-slide-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Resolved</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 mb-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col lg:flex-row gap-4">

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-button px-6 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-gray-300 hover:text-cyan-400 flex items-center gap-2"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <Filter size={20} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Actions */}
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Plus size={20} />
              NEW TICKET
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-cyan-500/20 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  PRIORITY
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-4 py-2 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  STATUS
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  SORT BY
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    <option value="date">Date</option>
                    <option value="priority">Priority</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-cyan-400 hover:border-cyan-400 transition-all"
                  >
                    {sortOrder === 'asc' ? <TrendingUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {searchQuery && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="hover:text-cyan-300">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedPriority !== 'all' && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                Priority: {selectedPriority}
                <button onClick={() => setSelectedPriority('all')} className="hover:text-cyan-300">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                Status: {selectedStatus}
                <button onClick={() => setSelectedStatus('all')} className="hover:text-cyan-300">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between animate-slide-in-up" style={{ animationDelay: '0.35s' }}>
          <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Showing <span className="text-cyan-400 font-semibold">{filteredTickets.length}</span> of <span className="text-white font-semibold">{allTickets.length}</span> tickets
          </p>
          <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm" style={{ fontFamily: 'Space Mono, monospace' }}>
            <Download size={16} />
            Export Results
          </button>
        </div>

        {/* Tickets List */}
        <div className="space-y-3 scrollbar-custom">
          {filteredTickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="ticket-card bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 cursor-pointer animate-slide-in-up"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                  {/* Header Row */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-cyan-400 font-bold text-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {ticket.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getPriorityColor(ticket.priority)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                      {getPriorityIcon(ticket.priority)}
                      {ticket.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                      {ticket.status}
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs" style={{ fontFamily: 'Space Mono, monospace' }}>
                      {ticket.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {ticket.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {ticket.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500" style={{ fontFamily: 'Space Mono, monospace' }}>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {ticket.assignee}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {ticket.created}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Due: {ticket.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {ticket.comments}
                    </span>
                    {ticket.attachments > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip size={14} />
                        {ticket.attachments}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {ticket.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs"
                        style={{ fontFamily: 'Space Mono, monospace' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col items-center gap-2">
                  <button className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-all" title="More Options">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredTickets.length === 0 && (
            <div className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-12 text-center animate-slide-in-up">
              <AlertCircle size={48} className="text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                No Tickets Found
              </h3>
              <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Modal for Ticket Details */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/70">
            <div className="bg-[#0d1425] border border-cyan-500/30 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-custom animate-slide-in-up">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {selectedTicket.id}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedTicket.priority)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                      {selectedTicket.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedTicket.status)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {selectedTicket.title}
                  </h3>
                  <p className="text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {selectedTicket.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Category</p>
                    <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedTicket.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Assignee</p>
                    <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedTicket.assignee}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Reporter</p>
                    <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedTicket.reporter}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Created</p>
                    <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedTicket.created}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Last Updated</p>
                    <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedTicket.updated}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Due Date</p>
                    <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedTicket.dueDate}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    TAKE ACTION
                  </button>
                  <button className="py-3 px-4 bg-[#151b2e] border border-cyan-500/30 text-cyan-400 font-bold rounded-lg hover:border-cyan-400 transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    EDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTickets;