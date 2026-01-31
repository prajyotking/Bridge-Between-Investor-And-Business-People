// FINAL, ROBUST VERSION - src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // import signOut
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import logger from '../utils/logger';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get their role from Firestore
        logger.info('User is logged in, fetching user data for UID:', firebaseUser.uid);
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data(),
            };
            setUser(userData);
            logger.info('Successfully fetched user data:', userData);
          } else {
            // This is a critical error state. The user exists in Auth but not in Firestore.
            logger.error('CRITICAL: User document not found in Firestore for UID:', firebaseUser.uid);
            // Sign the user out to prevent an inconsistent state.
            await signOut(auth);
            setUser(null);
          }
        } catch (error) {
            logger.error('Error fetching user document:', error);
            await signOut(auth);
            setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};