import { X, } from "lucide-react";

function TicketView({ ticket, onClose }) {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
            case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
            case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
            case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
            case 'in progress': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
            case 'Closed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
            case 'scheduled': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        }
    };
    const isClosed = ticket.status?.toLowerCase() === 'closed'
        || ticket.status?.toLowerCase() === 'resolved';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/70">
            <div className="bg-[#0d1425] border border-cyan-500/30 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-custom animate-slide-in-up">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {ticket.ticket_id}
                        </h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                                {ticket.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`} style={{ fontFamily: 'Space Mono, monospace' }}>
                                {ticket.status}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                            {ticket.title}
                        </h3>
                        <p className="text-gray-300" style={{ fontFamily: 'Space Mono, monospace' }}>
                            {ticket.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Category</p>
                            <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{ticket.category}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Assignee</p>
                            <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{ticket.assigned_to}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Reporter</p>
                            <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{ticket.reported_by}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Created</p>
                            <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{ticket.date_reported}</p>
                        </div>
                        {/* <div>
                            <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Last Updated</p>
                            <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{ticket.updated}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Due Date</p>
                            <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>{ticket.dueDate}</p>
                        </div> */}
                    </div>
                    {isClosed && (
                        <div className="border border-emerald-500/30 rounded-xl p-6 bg-emerald-500/5 space-y-4">
                            <h4
                                className="text-lg font-bold text-emerald-400"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                                Resolution Details
                            </h4>

                            {/* ROOT CAUSE */}
                            <div>
                                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>
                                    Root Cause
                                </p>
                                <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>
                                    {ticket.root_cause || '—'}
                                </p>
                            </div>

                            {/* RESOLUTION SUMMARY */}
                            <div>
                                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>
                                    Resolution Summary
                                </p>
                                <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>
                                    {ticket.resolution_summary || '—'}
                                </p>
                            </div>

                            {/* DATE CLOSED */}
                            <div>
                                <p className="text-gray-400 text-sm mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>
                                    Closed On
                                </p>
                                <p className="text-white" style={{ fontFamily: 'Space Mono, monospace' }}>
                                    {ticket.date_closed
                                        ? new Date(ticket.date_closed).toLocaleDateString()
                                        : '—'}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                        onClick={onClose}
                         className="py-3 px-4 bg-[#151b2e] border border-cyan-500/30 text-cyan-400 font-bold rounded-lg hover:border-cyan-400 transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TicketView