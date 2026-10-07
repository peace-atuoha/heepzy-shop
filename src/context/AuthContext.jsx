import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase'; // Will fail if firebase config isn't added, we handle that

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Dummy fallback if Firebase is not configured yet
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  useEffect(() => {
    try {
      if (auth) {
        setIsFirebaseConfigured(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
        return unsubscribe;
      }
    } catch (error) {
      console.warn("Firebase not configured properly. Using mock auth.");
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured) {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    } else {
      // Mock login
      setCurrentUser({
        uid: 'mock-123',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: 'https://i.pravatar.cc/150?img=11'
      });
      return Promise.resolve();
    }
  };

  const registerWithEmail = async (email, password, name) => {
    if (isFirebaseConfigured) {
      // Firebase registration
      return createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Mock registration
      setCurrentUser({
        uid: 'mock-123',
        displayName: name || email.split('@')[0],
        email: email,
        photoURL: 'https://i.pravatar.cc/150?img=11'
      });
      return Promise.resolve();
    }
  };

  const loginWithEmail = async (email, password) => {
    if (isFirebaseConfigured) {
      return signInWithEmailAndPassword(auth, email, password);
    } else {
      setCurrentUser({
        uid: 'mock-123',
        displayName: email.split('@')[0],
        email: email,
        photoURL: 'https://i.pravatar.cc/150?img=11'
      });
      return Promise.resolve();
    }
  };

  const resetPassword = async (email) => {
    if (isFirebaseConfigured) {
      return sendPasswordResetEmail(auth, email);
    } else {
      console.log(`Mock reset password email sent to ${email}`);
      return Promise.resolve();
    }
  };

  const logout = () => {
    if (isFirebaseConfigured) {
      return signOut(auth);
    } else {
      setCurrentUser(null);
      return Promise.resolve();
    }
  };

  const value = {
    currentUser,
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    resetPassword,
    logout,
    isFirebaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
