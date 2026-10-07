import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [view, setView] = useState('login'); // 'login', 'register', 'forgot'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (view === 'login') {
        await loginWithEmail(formData.email, formData.password);
        navigate('/dashboard');
      } else if (view === 'register') {
        await registerWithEmail(formData.email, formData.password, formData.name);
        navigate('/dashboard');
      } else if (view === 'forgot') {
        await resetPassword(formData.email);
        setMessage('Check your inbox for further instructions');
      }
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error("Google Auth Error:", err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled in your Firebase Console.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled.');
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Join Heepzy' : 'Reset Password'}
          </h2>
          <p className="text-gray-400 text-sm">
            {view === 'login' ? 'Sign in to access your cart and orders.' : view === 'register' ? 'Create an account to level up your style.' : 'Enter your email to reset your password.'}
          </p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-6 text-center">{error}</div>}
        {message && <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl mb-6 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>

          {view !== 'forgot' && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>
          )}

          {view === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => { setView('forgot'); setError(''); }} className="text-brand-yellow text-xs font-semibold hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-yellow text-black font-bold py-3.5 rounded-2xl mt-4 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70"
          >
            {loading ? 'Processing...' : view === 'login' ? 'Sign In' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {view !== 'forgot' && (
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute border-t border-white/10 w-full"></div>
              <span className="bg-brand-dark px-4 text-xs text-gray-500 relative">OR CONTINUE WITH</span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors disabled:opacity-70"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          {view === 'login' ? (
            <p>Don't have an account? <button onClick={() => { setView('register'); setError(''); }} className="text-white font-bold hover:underline">Sign up</button></p>
          ) : view === 'register' ? (
            <p>Already have an account? <button onClick={() => { setView('login'); setError(''); }} className="text-white font-bold hover:underline">Log in</button></p>
          ) : (
            <p>Remember your password? <button onClick={() => { setView('login'); setError(''); }} className="text-white font-bold hover:underline">Log in</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
