import { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import {
    Bell,
    Search,
    Filter,
    Menu,
    X,
    Sun,
    Moon
} from 'lucide-react';

function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    return (
        <header className={`${theme==='dark'?'bg-[#0d1425]/80':''}backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4 flex items-center gap-4 relative z-10`}>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className=" text-gray-400 hover:text-cyan-400 transition-colors"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 max-w-2xl">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search tickets, engineers, or issues..."
                        className={`w-full pl-12 pr-4 py-3 ${theme==='dark'?'bg-[#151b2e]':''} border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all`}
                        style={{ fontFamily: 'Space Mono, monospace' }}
                    />
                </div>
            </div>

            <button className={`${theme==='dark'?'bg-[#151b2e]':''} p-3 rounded-lg border border-cyan-500/30 text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all`}>
                <Filter size={20} />
            </button>

            <button className={`relative p-3 rounded-lg ${theme==='dark'?'bg-[#151b2e]':''} border border-cyan-500/30 text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all`}>
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button
                onClick={toggleTheme}
                className={`relative p-3 rounded-lg ${theme==='dark'?'bg-[#151b2e]':''} border border-cyan-500/30 text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all`}
            >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </header>
    )
}

export default Header