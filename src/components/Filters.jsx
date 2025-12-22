import { TrendingUp,ChevronDown } from 'lucide-react'
import { useState } from 'react';

function Filters() {
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedStatus, setSelectedStatus] = useState('all');
    
    return (
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
    )
}

export default Filters