import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleUserClick = () => {
    setMobileMenuOpen(false);
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center py-6 px-4 md:px-8 max-w-7xl mx-auto absolute top-0 left-0 right-0 z-50">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white z-50 relative">HEEPZY</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-2 py-1">
          <Link to="/" className="px-6 py-2 bg-white text-black rounded-full font-semibold text-sm">Home</Link>
          <a href="/#about" className="px-6 py-2 text-white hover:text-gray-300 font-semibold text-sm transition-colors">About</a>
          <a href="/#drops" className="px-6 py-2 text-white hover:text-gray-300 font-semibold text-sm transition-colors">Drops</a>
          <a href="/#explore" className="px-6 py-2 text-white hover:text-gray-300 font-semibold text-sm transition-colors flex items-center gap-2">
            Fresh In <span className="bg-brand-yellow text-black text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">New</span>
          </a>
        </div>

        <div className="flex gap-4 items-center z-50 relative">
          <Link to="/checkout" className="relative w-10 h-10 rounded-full border border-gray-500/50 flex items-center justify-center hover:bg-white/10 transition-colors text-white" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-yellow text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <div className="hidden md:flex gap-2">
            {currentUser ? (
              <>
                <button onClick={handleUserClick} className="w-10 h-10 rounded-full overflow-hidden border border-brand-yellow">
                  <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}`} alt="User" />
                </button>
                <button onClick={logout} className="w-10 h-10 rounded-full border border-gray-500/50 flex items-center justify-center hover:bg-white/10 transition-colors text-white" title="Logout">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <button onClick={handleUserClick} className="w-10 h-10 rounded-full border border-gray-500/50 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                <User size={18} />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 px-4 md:hidden">
          <a href="/#" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-white uppercase tracking-tighter">Home</a>
          <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-white/70 hover:text-white uppercase tracking-tighter">About</a>
          <a href="/#drops" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-white/70 hover:text-white uppercase tracking-tighter">Drops</a>
          <div className="w-full max-w-xs h-px bg-white/10 my-4"></div>
          {currentUser ? (
            <div className="flex flex-col items-center gap-4">
              <button onClick={handleUserClick} className="flex items-center gap-3 text-xl font-bold text-white">
                <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}`} className="w-8 h-8 rounded-full border border-brand-yellow" alt="User" />
                My Dashboard
              </button>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-gray-400 font-semibold mt-4">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleUserClick} className="bg-brand-yellow text-black font-black text-xl uppercase tracking-tighter px-10 py-4 rounded-full w-full max-w-xs">
              Log In / Register
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
