import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser, isFirebaseConfigured } = useAuth();

  useEffect(() => {
    if (currentUser && isFirebaseConfigured && currentUser.uid !== 'mock-123') {
      // Listen to Firebase Cart
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCart(cartItems);
      }, (error) => {
        console.error("Error fetching cart:", error);
      });
      return unsubscribe;
    } else {
      // Local cart if not logged in or using mock
      setCart([]);
    }
  }, [currentUser, isFirebaseConfigured]);

  const addToCart = async (product, size, color) => {
    if (currentUser && isFirebaseConfigured && currentUser.uid !== 'mock-123') {
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      
      // Check if item exists in local state to update quantity, else add new
      const existing = cart.find(item => item.productId === product.id && item.size === size && item.color === color);
      
      if (existing) {
        const itemRef = doc(db, 'users', currentUser.uid, 'cart', existing.id);
        await setDoc(itemRef, { ...existing, quantity: existing.quantity + 1 });
      } else {
        const newItemRef = doc(cartRef);
        await setDoc(newItemRef, {
          productId: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          size,
          color,
          quantity: 1
        });
      }
    } else {
      // Fallback local cart behavior
      setCart(prev => {
        const existing = prev.find(item => item.productId === product.id && item.size === size && item.color === color);
        if (existing) {
          return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, productId: product.id, size, color, quantity: 1, id: Date.now().toString() }];
      });
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (currentUser && isFirebaseConfigured && currentUser.uid !== 'mock-123') {
      const itemRef = doc(db, 'users', currentUser.uid, 'cart', cartItemId);
      await deleteDoc(itemRef);
    } else {
      setCart(prev => prev.filter(item => item.id !== cartItemId));
    }
  };

  const clearCart = async () => {
    if (currentUser && isFirebaseConfigured && currentUser.uid !== 'mock-123') {
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      const snapshot = await getDocs(cartRef);
      snapshot.forEach(async (document) => {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'cart', document.id));
      });
    } else {
      setCart([]);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
