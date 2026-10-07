import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { seedFirebaseProducts } from '../utils/seedFirebase';
import CachedImage from '../components/CachedImage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Package, User, LogOut, Loader2, Database, Clock } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout, isFirebaseConfigured } = useAuth();
  const [seeding, setSeeding] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser && isFirebaseConfigured && currentUser.uid !== 'mock-123') {
        try {
          const q = query(
            collection(db, 'orders'), 
            where('userId', '==', currentUser.uid)
          );
          const snapshot = await getDocs(q);
          const userOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleDateString() : 'Just now',
            total: doc.data().totalAmount
          }));
          
          userOrders.sort((a, b) => b.createdAt - a.createdAt);
          setOrders(userOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [currentUser, isFirebaseConfigured]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleSeed = async () => {
    setSeeding(true);
    await seedFirebaseProducts();
    setSeeding(false);
    alert('Products seeded to Firebase successfully!');
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-32 pb-20 selection:bg-brand-yellow selection:text-black">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 mb-10 backdrop-blur-xl flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-yellow/10 to-transparent pointer-events-none"></div>
          
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-yellow/50 relative z-10 shadow-[0_0_40px_rgba(202,255,0,0.2)]">
            <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}&background=caff00&color=000`} alt="User" className="w-full h-full object-cover" />
          </div>
          
          <div className="text-center md:text-left relative z-10 flex-1">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">{currentUser.displayName || 'Sneakerhead'}</h1>
            <p className="text-gray-400 font-medium mb-6 flex items-center justify-center md:justify-start gap-2">
              <User size={16} /> {currentUser.email}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button onClick={logout} className="px-6 py-3 bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white rounded-full font-bold text-sm transition-colors flex items-center gap-2 border border-white/10 hover:border-red-500/50">
                <LogOut size={16} /> Sign Out
              </button>
              <Link to="/#explore" className="px-6 py-3 bg-brand-yellow text-black rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(202,255,0,0.3)]">
                <Package size={16} /> Browse Drops
              </Link>
            </div>
          </div>
        </div>

        {/* Developer Admin Section */}
        {isFirebaseConfigured && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-3xl p-6 mb-10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-blue-400 uppercase tracking-tight flex items-center gap-2 mb-1">
                <Database size={20} /> Developer Setup
              </h3>
              <p className="text-blue-200/70 text-sm">Push the latest product catalog to your live Firebase Firestore database.</p>
            </div>
            <button 
              onClick={handleSeed} 
              disabled={seeding}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {seeding ? <><Loader2 size={18} className="animate-spin"/> Syncing...</> : 'Push Products to Firebase'}
            </button>
          </div>
        )}

        {/* Orders Section */}
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
          <Clock className="text-brand-yellow" size={28} /> Order History
        </h2>
        
        <div className="space-y-6">
          {loadingOrders ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <Loader2 className="animate-spin w-10 h-10 mb-4 text-brand-yellow" />
              <p className="font-bold uppercase tracking-wider">Loading Orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                <Package size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">No Orders Yet</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">You haven't copped anything yet. Check out the latest drops and level up your style.</p>
              <Link to="/" className="px-8 py-4 bg-brand-yellow text-black font-black uppercase rounded-full hover:scale-105 transition-transform inline-block shadow-[0_0_20px_rgba(202,255,0,0.2)]">
                Start Shopping
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-white/20 transition-colors">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-white font-medium">{order.date}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Total</p>
                    <p className="text-3xl font-black text-brand-yellow">${order.total}.00</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg font-bold text-sm text-center uppercase tracking-wider">
                    {order.status || 'Processing'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0">
                        <CachedImage src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">{item.name}</h4>
                        <p className="text-gray-400 text-sm">{item.size} • {item.color}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${item.price}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
