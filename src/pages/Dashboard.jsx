import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Navigate, Link } from 'react-router-dom';
import { seedFirebaseProducts } from '../utils/seedFirebase';
import CachedImage from '../components/CachedImage';

const Dashboard = () => {
  const { currentUser, logout, isFirebaseConfigured } = useAuth();
  const { cart, cartTotal } = useCart();
  const [seeding, setSeeding] = useState(false);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // Dummy order data
  const orders = [
    { id: 'ORD-8923', date: '2026-10-01', total: 480, status: 'Delivered' },
    { id: 'ORD-9102', date: '2026-10-05', total: 250, status: 'Processing' },
  ];

  const handleSeed = async () => {
    setSeeding(true);
    await seedFirebaseProducts();
    setSeeding(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-32 min-h-screen">
      <div className="bg-white/5 rounded-[40px] p-8 md:p-12 border border-white/10 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12 border-b border-white/10 pb-12">
          <img 
            src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}`} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-brand-yellow object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-black mb-2">{currentUser.displayName}</h1>
            <p className="text-gray-400 mb-4">{currentUser.email}</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200">
                Edit Profile
              </button>
              <button onClick={logout} className="px-6 py-2 border border-red-500/50 text-red-500 rounded-full font-bold text-sm hover:bg-red-500/10">
                Logout
              </button>
            </div>
          </div>
          
          <div className="bg-black/30 p-6 rounded-2xl border border-white/10 max-w-xs text-center md:text-left">
            <h3 className="font-bold text-brand-yellow mb-2">Admin Actions</h3>
            <p className="text-xs text-gray-400 mb-4">Upload the local product list directly to your Firebase Firestore database.</p>
            <button 
              onClick={handleSeed}
              disabled={seeding}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
            >
              {seeding ? 'Syncing...' : 'Sync Products to Firebase'}
            </button>
            {!isFirebaseConfigured && (
              <p className="text-[10px] text-red-400 mt-2 text-center md:text-left">⚠️ Please add your config in src/firebase.js first.</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
          </div>
          {orders.length > 0 ? (
            <div className="overflow-x-auto mb-16">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="pb-4 font-medium">Order ID</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Total</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                      <td className="py-4 font-bold">{order.id}</td>
                      <td className="py-4 text-gray-300">{order.date}</td>
                      <td className="py-4 font-bold text-brand-yellow">${order.total}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-sm font-semibold text-gray-400 hover:text-white">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-black/20 rounded-2xl mb-16 border border-white/5">
              <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
              <Link to="/" className="px-6 py-3 bg-brand-yellow text-black rounded-full font-bold inline-block">Start Shopping</Link>
            </div>
          )}

          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold">In Your Cart (Ready for Checkout)</h2>
          </div>
          
          <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
            {cart.length > 0 ? (
              <div>
                <div className="space-y-4 mb-6">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white">
                        <CachedImage src={item.images[0]} className="w-full h-full" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-gray-400">Size: {item.size} | Color: {item.color}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-yellow font-bold">${item.price * item.quantity}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                   <p className="text-gray-400">Total Pending: <span className="text-brand-yellow font-bold text-xl ml-2">${cartTotal}</span></p>
                   <Link to="/checkout" className="px-6 py-2 bg-brand-yellow text-black rounded-full font-bold text-sm">Proceed to Checkout</Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                 <p className="text-gray-400 mb-4">You have no items pending in your checkout cart.</p>
                 <Link to="/" className="text-brand-yellow hover:underline font-bold">Go back to shop</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
