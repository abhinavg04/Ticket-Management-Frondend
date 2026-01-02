import { useState } from 'react';
import { AlertCircle, CheckCircle2, Server, Shield, Network } from 'lucide-react';
import { Link } from 'react-router';
import { register } from '../api/user';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    emp_id: '',
    username:'',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
    }
    if (!formData.username) {
      newErrors.username = 'User name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // if (!formData.department) {
    //   newErrors.department = 'Department is required';
    // }
    
    if (!formData.emp_id) {
      newErrors.emp_id = 'Employee ID is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);
    
    setIsLoading(true);
    try{
      const res = await register(formData);
      if(res.status == 201){
        toast.success("Request Sent!");
      }
      console.log(res.data);
      
    }
    catch{
      toast.error("Some Error Occured!")
    }
    setIsLoading(false);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-600';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'No password';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Floating network icons */}
      <div className="absolute top-32 right-20 opacity-10 animate-float">
        <Shield size={40} className="text-emerald-400" />
      </div>
      <div className="absolute bottom-40 right-40 opacity-10 animate-float" style={{ animationDelay: '0.7s' }}>
        <Network size={38} className="text-cyan-400" />
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

        @keyframes fill-progress {
          from { width: 0%; }
          to { width: var(--target-width); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .glow-border {
          position: relative;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1));
          border: 1px solid rgba(0, 255, 157, 0.2);
        }

        .glow-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, #06b6d4, #10b981);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .glow-border:hover::before {
          opacity: 0.3;
        }

        input:focus, select:focus {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .strength-bar {
          animation: fill-progress 0.5s ease-out forwards;
        }
      `}</style>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl my-8">
        <div className="glow-border rounded-2xl backdrop-blur-xl p-8 shadow-2xl animate-slide-up">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 mb-4 shadow-lg shadow-cyan-500/50">
              <Server size={36} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ACCESS REQUEST
            </h1>
            <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em' }}>
              Register for Network Operations Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                  placeholder="John Smith"
                />
                {errors.full_name && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.full_name}</span>
                  </div>
                )}
              </div>

              {/* Employee ID */}
              <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                  placeholder="username"
                />
                {errors.emp_id && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.emp_id}</span>
                  </div>
                )}
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  EMPLOYEE ID
                </label>
                <input
                  type="text"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                  placeholder="EMP-12345"
                />
                {errors.emp_id && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.emp_id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                style={{ fontFamily: 'Space Mono, monospace' }}
                placeholder="engineer@network.com"
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Department */}
            {/* <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                DEPARTMENT
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                <option value="">Select Department</option>
                <option value="network-operations">Network Operations</option>
                <option value="network-engineering">Network Engineering</option>
                <option value="security-operations">Security Operations</option>
                <option value="systems-engineering">Systems Engineering</option>
                <option value="it-support">IT Support</option>
                <option value="devops">DevOps</option>
              </select>
              {errors.department && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.department}</span>
                </div>
              )}
            </div> */}

            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                  placeholder="••••••••••"
                />
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength >= level ? getStrengthColor() : 'bg-gray-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
                      Strength: {getStrengthText()}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                  placeholder="••••••••••"
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-emerald-400 text-sm">
                    <CheckCircle2 size={14} />
                    <span style={{ fontFamily: 'Space Mono, monospace' }}>Passwords match</span>
                  </div>
                )}
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: 'Space Mono, monospace' }}>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-cyan-500/30 bg-[#151b2e] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
                I agree to the Terms of Service and Privacy Policy. I understand that my access will be reviewed by the security team.
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-up"
              style={{ fontFamily: 'Orbitron, sans-serif', animationDelay: '0.45s' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  PROCESSING REQUEST...
                </span>
              ) : (
                'REQUEST ACCESS'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Login link */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.55s' }}>
            <p className="text-gray-400" style={{ fontFamily: 'Space Mono, monospace' }}>
              Already have access?{' '}
              <Link
                to={'/'}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm animate-slide-up" style={{ fontFamily: 'Space Mono, monospace', animationDelay: '0.6s' }}>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Registration System: Active
        </div>
      </div>
    </div>
  );
};

export default Register;