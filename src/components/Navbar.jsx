import React from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleUserClick = async () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      try {
        await loginWithGoogle();
        navigate('/dashboard');
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  };

  return (
    <nav className="flex justify-between items-center py-6 px-4 md:px-8 max-w-7xl mx-auto absolute top-0 left-0 right-0 z-50">
      <Link to="/" className="text-2xl font-bold tracking-tight text-white">Heepzy</Link>
      
      <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-2 py-1">
        <Link to="/" className="px-6 py-2 bg-white text-black rounded-full font-semibold text-sm">Home</Link>
        <Link to="/" className="px-6 py-2 text-white hover:text-gray-300 font-semibold text-sm transition-colors">About</Link>
        <Link to="/" className="px-6 py-2 text-white hover:text-gray-300 font-semibold text-sm transition-colors">Drops</Link>
        <Link to="/" className="px-6 py-2 text-white hover:text-gray-300 font-semibold text-sm transition-colors flex items-center gap-2">
          Fresh In <span className="bg-brand-yellow text-black text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">New</span>
        </Link>
      </div>

      <div className="flex gap-4">
        <Link to="/checkout" className="relative w-10 h-10 rounded-full border border-gray-500/50 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-yellow text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        {currentUser ? (
          <div className="flex gap-2">
            <button onClick={handleUserClick} className="w-10 h-10 rounded-full overflow-hidden border border-brand-yellow">
              <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}`} alt="User" />
            </button>
            <button onClick={logout} className="w-10 h-10 rounded-full border border-gray-500/50 flex items-center justify-center hover:bg-white/10 transition-colors text-white" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={handleUserClick} className="w-10 h-10 rounded-full border border-gray-500/50 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
            <User size={18} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
