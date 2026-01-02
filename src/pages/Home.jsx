import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AuthProvider } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useEffect,useState } from 'react';


function HomePage() {
  const { theme } = useTheme()
  useEffect(()=>{
    
  },[theme])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  return (
    <>
      <AuthProvider>
        <div className={`${theme==='dark'?'bg-[#0a0e1a]':''} h-screen flex overflow-hidden`}>
          <Sidebar isSidebarOpen={isSidebarOpen} />

          <main className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen?' ml-65':'ml-20'}`}>
            <Header toggleSidebar={toggleSidebar}  isSidebarOpen={isSidebarOpen}  />

            {/* CONTENT AREA */}
            <section className={`flex-1 ${isSidebarOpen?'w-full':''} overflow-y-auto scrollbar-custom p-6 space-y-6`}>
              <Outlet />
            </section>
          </main>
        </div>
      </AuthProvider>
    </>
  );
};

export default HomePage;