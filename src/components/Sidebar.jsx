import {
    FileText,
    Home,
    Plus,
    BarChart3,
    Users
} from 'lucide-react';
import { NavLink } from 'react-router';
import Logo from './Logo';
import UserProfile from './UserProfile';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';


function Sidebar({ isSidebarOpen }) {
    const { theme } = useTheme()
    const { user } = useUser()
    const navItemClass = ({ isActive }) =>
        `sidebar-item w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
   ${isActive ? 'active text-cyan-400 bg-cyan-500/10' : 'text-gray-400 hover:bg-cyan-500/5'}
  `;
    // Sample data - replace with real API data
    const stats = {
        totalTickets: 1247,
        openTickets: 342,
        inProgress: 156,
        resolved: 749,
        avgResolutionTime: '4.2h',
        criticalIssues: 23
    };

    return (
        < aside
            className={`${isSidebarOpen ? 'w-72' : 'w-24'
                } fixed left-0 top-0 h-screen
                ${theme === 'dark' ? 'bg-[#0d1425]' : ''}
                border-r border-cyan-500/20
                transition-all duration-300
                z-20`
            }
        >
            <div className="h-full flex flex-col p-6">
                <Logo isSidebarOpen={isSidebarOpen} />

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    <NavLink
                        to={'/dashboard'}
                        end
                        className={navItemClass}
                        style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.1s', }}
                    >
                        <Home size={20} />
                        {isSidebarOpen && <span>Overview</span>}
                    </NavLink>
                    {
                        ["admin"].includes(user.role) && (
                            <NavLink
                                to={'/dashboard/all-tickets'}
                                end
                                className={navItemClass}
                                style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.2s' }}
                            >
                                <FileText size={20} />
                                {isSidebarOpen && <span>All Tickets</span>}
                            </NavLink>
                        )
                    }

                    {/* {
                        ["user", "engineer"].includes(user.role) && (
                            <NavLink
                                to={'/dashboard/all-tickets'}
                                end
                                className={navItemClass}
                                style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.2s' }}
                            >
                                <FileText size={20} />
                                <span>All Tickets</span>
                                <span className="ml-auto bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded text-xs">
                                    {stats.totalTickets}
                                </span>
                            </NavLink>
                        )} */}
                    <NavLink
                        to={'/dashboard/create-tickets'}
                        end
                        className={navItemClass}
                        style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.2s' }}
                    >
                        <Plus size={20} />
                        {isSidebarOpen && <span>Create Ticket</span>}
                    </NavLink>
                    <NavLink
                        to={'/dashboard/assigned-tickets'}
                        end
                        className={navItemClass}
                        style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.3s' }}
                    >
                        <BarChart3 size={20} />
                        {isSidebarOpen && <span>Assigned Tickets</span>}
                    </NavLink>
                    {/* <NavLink
                        className={navItemClass}
                        style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.4s' }}
                    >
                        <Network size={20} />
                        <span>Manage User</span>
                    </NavLink> */}

                    {
                        ["admin"].includes(user.role) && (<NavLink
                            to={'/dashboard/manage-users'}
                            end
                            className={navItemClass}
                            style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.5s' }}
                        >
                            <Users size={20} />
                            {isSidebarOpen && <span>Manage Users</span>}
                        </NavLink>)
                    }
                    {/*

                   

                    <NavLink

                        className={navItemClass}
                        style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.6s' }}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink> */}
                </nav>

                {/* User Profile */}
                <UserProfile isSidebarOpen={isSidebarOpen} />
            </div >
        </aside >
    )
}

export default Sidebar