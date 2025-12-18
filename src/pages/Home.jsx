import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AuthProvider } from '../context/UserContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';


function HomePage() {
  const { theme } = useTheme()
  useEffect(()=>{
    
  },[theme])
  return (
    <>
      <AuthProvider>
        <div className={`${theme==='dark'?'bg-[#0a0e1a]':''} h-screen flex overflow-hidden`}>
          <Sidebar />

          <main className="flex-1 flex flex-col overflow-hidden ml-65">
            <Header />

            {/* CONTENT AREA */}
            <section className="flex-1 overflow-y-auto scrollbar-custom p-6 space-y-6">
              <Outlet />
            </section>
          </main>
        </div>
      </AuthProvider>
    </>
  );
};

export default HomePage;