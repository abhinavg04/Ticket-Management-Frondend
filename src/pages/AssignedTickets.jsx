import React, { useEffect, useState } from 'react';
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
import { exportTickets, getAssignedTicket } from '../api/ticket';
import TicketView from '../components/TicketView';
import TicketUpdateView from '../components/TicketUpdateView';

const AssignedTickets = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [tickets, setTickets] = useState([]);


  // Sample tickets data - replace with your API data
  //   const tickets = [
  //     {
  //       id: 'TKT-2891',
  //       title: 'Network Outage - Building A',
  //       description: 'Complete network outage affecting all floors in Building A. Multiple users unable to connect to any network resources.',
  //       priority: 'Critical',
  //       status: 'In Progress',
  //       category: 'Infrastructure',
  //       assignee: 'John Smith',
  //       reporter: 'Sarah Johnson',
  //       created: '2024-12-16 09:15 AM',
  //       updated: '2024-12-16 10:30 AM',
  //       dueDate: '2024-12-16 02:00 PM',
  //       comments: 12,
  //       attachments: 3,
  //       tags: ['Network', 'Outage', 'P1']
  //     },
  //   ];

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


  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  useEffect(() => {
    const fetchTickets = async () => {
      const res = await getAssignedTicket(selectedStatus, selectedPriority)
      setTickets(res)
      console.log(res);

    }
    fetchTickets()
  }, [selectedPriority, selectedStatus])
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
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TICKETS MANAGEMENT
              </h1>
              <p className="text-gray-400 mt-1" style={{ fontFamily: 'Space Mono, monospace' }}>
                Track and manage all network operations tickets
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-button px-6 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-gray-300 hover:text-cyan-400 flex items-center gap-2"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <Filter size={20} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                  <option value="">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
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
                  <option value="">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
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
            {/* {searchQuery && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="hover:text-cyan-300">
                  <X size={14} />
                </button>
              </span>
            )} */}
            {selectedPriority !== '' && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                Priority: {selectedPriority}
                <button onClick={() => setSelectedPriority('')} className="hover:text-cyan-300">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedStatus !== '' && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                Status: {selectedStatus}
                <button onClick={() => setSelectedStatus('')} className="hover:text-cyan-300">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between animate-slide-in-up" style={{ animationDelay: '0.35s' }}>
          {/* <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
            Showing <span className="text-cyan-400 font-semibold">{filteredTickets.length}</span> of <span className="text-white font-semibold">{tickets.length}</span> tickets
          </p> */}
          <button
            onClick={() => exportTickets('me')}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm" style={{ fontFamily: 'Space Mono, monospace' }}>
            <Download size={16} />
            Export Results
          </button>
        </div>

        {/* Tickets List */}
        <div className="space-y-3 scrollbar-custom">
          {tickets.map((ticket, index) => (
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
                      {ticket.ticket_id}
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
                    TIcket {ticket.id}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {ticket.issue_description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500" style={{ fontFamily: 'Space Mono, monospace' }}>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {ticket.reported_by}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {ticket.date_reported}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Due: {ticket.dueDate}
                    </span>
                    {/* <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {ticket.comments}
                    </span> */}
                    {ticket.attachments > 0 && (
                      <span className="flex items-center gap-1">
                        <Paperclip size={14} />
                        {ticket.attachments}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {/* {ticket.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs"
                        style={{ fontFamily: 'Space Mono, monospace' }}
                      >
                        #{tag}
                      </span>
                    ))} */}
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
          {tickets.length === 0 && (
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
          <TicketUpdateView ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
        )}
      </div>
    </div>
  );
};

export default AssignedTickets;