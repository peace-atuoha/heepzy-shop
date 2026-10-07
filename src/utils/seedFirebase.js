import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { products } from '../data/products';

export const seedFirebaseProducts = async () => {
  if (!db) {
    console.error("Firebase is not configured yet. Please configure src/firebase.js first.");
    return false;
  }

  try {
    const productsCollection = collection(db, 'products');
    
    // First, check if products already exist to prevent duplicate seeding
    const snapshot = await getDocs(productsCollection);
    if (!snapshot.empty) {
      console.log("Products already exist in Firebase. Clearing old products...");
      // Optional: Clear old products before seeding new ones
      const batch = writeBatch(db);
      snapshot.docs.forEach((document) => {
        batch.delete(doc(db, 'products', document.id));
      });
      await batch.commit();
    }
    
    // Seed new products using a batch for performance
    const newBatch = writeBatch(db);
    
    for (const product of products) {
      const newDocRef = doc(productsCollection); // Auto-generate ID
      newBatch.set(newDocRef, {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        description: product.description,
        createdAt: new Date()
      });
    }
    
    await newBatch.commit();
    console.log("Successfully uploaded all products to Firebase!");
    return true;
  } catch (error) {
    console.error("Error seeding database: ", error);
    throw error;
  }
};
