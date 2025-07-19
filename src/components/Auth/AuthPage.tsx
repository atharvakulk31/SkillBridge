import React, { useState } from 'react';
import { GraduationCap, Building2, Shield, Mail, Lock, User, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    gpa: '',
    companyName: '',
    contactPerson: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Apply for placement drives and manage your profile',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'admin',
      title: 'TPO Admin',
      description: 'Manage placement drives and student applications',
      icon: Shield,
      color: 'from-green-500 to-green-600'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password, selectedRole);
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
          department: formData.department,
          year: formData.year,
          gpa: formData.gpa,
          companyName: formData.companyName,
          contactPerson: formData.contactPerson
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Placement Management System
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Choose your role to continue
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto animate-scale-in">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/20 hover:border-indigo-200 group"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${role.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-4 group-hover:text-indigo-600 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed font-medium">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole)!;
  const IconComponent = selectedRoleData.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-scale-in">
          <div className="text-center mb-8 animate-slide-up">
            <button
              onClick={() => setSelectedRole(null)}
              className="mb-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium flex items-center mx-auto"
            >
              ← Back to role selection
            </button>
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedRoleData.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 font-medium text-lg">{selectedRoleData.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {selectedRole === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                        <select
                          required
                          value={formData.department}
                          onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                        >
                          <option value="">Select Department</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Mechanical">Mechanical</option>
                          <option value="Civil">Civil</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                        <select
                          required
                          value={formData.year}
                          onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                        >
                          <option value="">Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">GPA</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          required
                          value={formData.gpa}
                          onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                          placeholder="8.5"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${selectedRoleData.color} text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-lg hover:shadow-xl text-lg`}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;