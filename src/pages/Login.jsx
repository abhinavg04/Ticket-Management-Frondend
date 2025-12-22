import { useState } from 'react';
import { AlertCircle, Wifi, Server, Activity } from 'lucide-react';
import { Link } from 'react-router';
import { login } from '../api/user';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
  const nav = useNavigate()
  const [userData, setuserData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.username) {
      newErrors.username = 'Username is required';
    }
    if (!userData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    // 🚨 STOP if validation fails
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData()
    console.log(userData)
    formData.append('username', userData.username)
    formData.append('password', userData.password)
    try {
      const res = await login(formData)
      if (res.status == 401){
        toast.error("Login credential incorrect")
      }
      console.log(res);
      
      if (res.status == 200){
        localStorage.setItem('token', res.data.access_token)
        toast.success(`Welcome back`)
        nav('/dashboard');
      }
    }
    catch (e) {
      toast.error("Login Failed")
    }
    finally {

      setIsLoading(false)
    }


  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-linear(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-linear(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Floating network icons */}
      <div className="absolute top-20 left-20 opacity-10 animate-float">
        <Server size={40} className="text-cyan-400" />
      </div>
      <div className="absolute top-40 right-32 opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <Wifi size={36} className="text-emerald-400" />
      </div>
      <div className="absolute bottom-32 left-40 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
        <Activity size={44} className="text-cyan-400" />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght:400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 157, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 157, 0.5); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .glow-border {
          position: relative;
          background: linear-linear(135deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1));
          border: 1px solid rgba(0, 255, 157, 0.2);
        }

        .glow-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-linear(135deg, #06b6d4, #10b981);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .glow-border:hover::before {
          opacity: 0.3;
        }

        input:focus {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glow-border rounded-2xl backdrop-blur-xl p-8 shadow-2xl animate-slide-up">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-cyan-500 to-emerald-500 mb-4 shadow-lg shadow-cyan-500/50">
              <Server size={36} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              NETCORE
            </h1>
            <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em' }}>
              Network Operations Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* username field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                USERNAME
              </label>
              <input
                type="username"
                name="username"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                style={{ fontFamily: 'Space Mono, monospace' }}
                placeholder="Enter Username"
              />
              {errors.username && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.username}</span>
                </div>
              )}
            </div>

            {/* Password field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                style={{ fontFamily: 'Space Mono, monospace' }}
                placeholder="••••••••••"
              />
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button
                type="button"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-linear-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-up"
              style={{ fontFamily: 'Orbitron, sans-serif', animationDelay: '0.4s' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  AUTHENTICATING...
                </span>
              ) : (
                'ACCESS SYSTEM'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Register link */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
              New to the network?{' '}
              <Link
                to={'/reg'}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Request Access
              </Link>
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm animate-slide-up" style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.7s' }}>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          System Status: Online
        </div>
      </div>
    </div>
  );
};

export default Login;