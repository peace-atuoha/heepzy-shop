import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CachedImage from '../components/CachedImage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; 

const Checkout = () => {
  const { currentUser, loginWithGoogle, isFirebaseConfigured } = useAuth();
  const { cart, cartTotal, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', address: '', city: '',
    cardNumber: '', expiry: '', cvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login first!");
      return;
    }
    setLoading(true);

    try {
      // 1. Process payment via Stripe/Braintree (Mocked here)
      
      // 2. Save order to Firebase Firestore
      if (isFirebaseConfigured && currentUser.uid !== 'mock-123') {
        const ordersRef = collection(db, 'orders');
        await addDoc(ordersRef, {
          userId: currentUser.uid,
          customerEmail: currentUser.email,
          customerName: formData.name,
          shippingAddress: `${formData.address}, ${formData.city}`,
          items: cart.map(item => ({
             productId: item.productId,
             name: item.name,
             size: item.size,
             color: item.color,
             price: item.price,
             quantity: item.quantity
          })),
          totalAmount: cartTotal,
          status: 'Processing',
          createdAt: serverTimestamp()
        });
      }

      // 3. Trigger Mailgun function (Mocked fetch)
      // fetch('/.netlify/functions/send-email', { ... })
      
      setSuccess(true);
      await clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 min-h-screen text-center flex flex-col justify-center">
        <div className="w-24 h-24 bg-brand-yellow text-black rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-black mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">Your order has been placed and a confirmation email has been sent.</p>
        <Link to="/dashboard" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 inline-block">
          View Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl font-black mb-10">Checkout</h1>
      
      {!currentUser ? (
        <div className="bg-white/5 p-12 rounded-[40px] text-center border border-white/10 max-w-xl mx-auto backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6">Login to continue checkout</h2>
          <button 
            onClick={loginWithGoogle}
            className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-3 w-full hover:bg-gray-200 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Continue with Google
          </button>
        </div>
      ) : cart.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="px-8 py-4 bg-brand-yellow text-black font-bold rounded-full inline-block">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white/5 p-8 rounded-[30px] border border-white/10 h-fit">
            <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4">Order Summary</h2>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shrink-0">
                    <CachedImage src={item.images[0]} className="w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-bold">{item.name}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Size: {item.size} | Color: {item.color}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-semibold bg-white/10 px-2 py-1 rounded">Qty: {item.quantity}</p>
                      <p className="font-bold text-brand-yellow">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-6 mt-6">
              <div className="flex justify-between mb-3 text-gray-300">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-black text-2xl mt-6 pt-4 border-t border-white/5">
                <span>Total</span>
                <span className="text-brand-yellow">${cartTotal}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleCheckout} className="bg-white/5 p-8 rounded-[30px] border border-white/10">
            <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4">Shipping & Payment</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Shipping Details</label>
                <div className="space-y-3">
                  <input name="name" onChange={handleInputChange} value={formData.name} type="text" placeholder="Full Name" defaultValue={currentUser.displayName} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-yellow outline-none transition-colors" required />
                  <input name="address" onChange={handleInputChange} value={formData.address} type="text" placeholder="Street Address" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-yellow outline-none transition-colors" required />
                  <input name="city" onChange={handleInputChange} value={formData.city} type="text" placeholder="City & Zip Code" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-yellow outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 mt-8">Card Details (Dummy Payment)</label>
                <div className="space-y-3">
                  <div className="relative">
                    <input name="cardNumber" onChange={handleInputChange} value={formData.cardNumber} type="text" placeholder="Card Number" maxLength="19" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-yellow outline-none transition-colors" required />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div className="flex gap-3">
                    <input name="expiry" onChange={handleInputChange} value={formData.expiry} type="text" placeholder="MM/YY" maxLength="5" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-yellow outline-none transition-colors" required />
                    <input name="cvc" onChange={handleInputChange} value={formData.cvc} type="text" placeholder="CVC" maxLength="3" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-yellow outline-none transition-colors" required />
                  </div>
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full py-4 mt-8 bg-brand-yellow text-black font-black rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(229,241,33,0.3)] flex justify-center items-center gap-2"
              >
                {loading ? (
                  <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></span> Processing...</>
                ) : (
                  `Pay $${cartTotal}`
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
