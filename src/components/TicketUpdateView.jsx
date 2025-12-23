import React, { useState } from 'react'
import { updateTicket } from '../api/ticket';
import { toast } from 'react-toastify'

const Info = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-white font-medium">{value}</p>
    </div>
);

function TicketUpdateView({ ticket, onClose }) {
    const [formData, setformData] = useState({
        status: ticket.status,
        root_cause: '',
        resolution_summary: '',
    })
    const handleSumbit = async ( e ) => {
         e.preventDefault(); 
        try {
            const res = await updateTicket(ticket.id, formData);
            toast.success(`Ticket ${ticket.id} updated successfully`)
            onClose(); // optional: close modal after update
        } catch {
            toast.error("Some Error Occurred!")
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <div className="bg-[#0d1425] border border-cyan-500/30 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-up">

                {/* HEADER */}
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {ticket.ticket_id}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* BASIC INFO */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Info label="Category" value={ticket.category} />
                    <Info label="Priority" value={ticket.priority} />
                    <Info label="Reported By" value={ticket.reported_by} />
                    <Info label="Assigned To" value={ticket.assigned_to} />
                </div>

                <form onSubmit={handleSumbit} method="put">
                    {/* STATUS SELECT */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                            STATUS
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setformData({ ...formData, status: e.target.value })
                            }
                            className="w-full bg-[#151b2e] border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    {/* ROOT CAUSE */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                            ROOT CAUSE
                        </label>
                        <textarea
                            value={formData.root_cause || ""}
                            onChange={(e) =>
                                setformData({ ...formData, root_cause: e.target.value })
                            }
                            rows={3}
                            className="w-full bg-[#151b2e] border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                            placeholder="Describe the root cause..."
                        />
                    </div>

                    {/* RESOLUTION SUMMARY */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                            RESOLUTION SUMMARY
                        </label>
                        <textarea
                            value={formData.resolution_summary || ""}
                            onChange={(e) =>
                                setformData({
                                    ...formData,
                                    resolution_summary: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full bg-[#151b2e] border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                            placeholder="How was the issue resolved?"
                        />
                    </div>


                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4">
                        <button
                            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                            style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                            UPDATE TICKET
                        </button>

                        <button
                            type='button'
                            onClick={onClose}
                            className="py-3 px-6 bg-[#151b2e] border border-cyan-500/30 text-cyan-400 font-bold rounded-lg hover:border-cyan-400 transition-all"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default TicketUpdateView