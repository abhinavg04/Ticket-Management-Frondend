import React from 'react'
import { LogOut } from 'lucide-react'
import { logout } from '../api/user';
import { useNavigate } from 'react-router';

function UserProfile() {
    const nav = useNavigate()
    const logout_user = () => {
        logout()
        nav('/')
    }
    return (
        <div className="pt-6 border-t border-cyan-500/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    JS
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-200" style={{ fontFamily: 'Space Mono, monospace' }}>
                        John Smith
                    </p>
                    <p className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Space Mono, monospace' }}>
                        Network Engineer
                    </p>
                </div>
                <button onClick={logout_user} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <LogOut size={18} />
                </button>
            </div>
        </div>

    )
}

export default UserProfile