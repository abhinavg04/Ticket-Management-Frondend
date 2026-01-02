import { Server } from "lucide-react"

function Logo({isSidebarOpen}) {
    return (
        <div className="flex items-center gap-3 mb-10 animate-slide-in-left">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Server size={24} className="text-white" strokeWidth={2.5} />
            </div>
            {
                isSidebarOpen && <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    NETCORE
                </h1>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Space Mono, monospace' }}>
                    Network Ops
                </p>
            </div>
            }
        </div>
    )
}

export default Logo