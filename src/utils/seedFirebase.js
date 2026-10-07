import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { products } from '../data/products';

export const seedFirebaseProducts = async () => {
  if (!db) {
    alert("Firebase is not configured yet. Please configure src/firebase.js first.");
    return;
  }

  try {
    const productsCollection = collection(db, 'products');
    
    // We loop through the local products and push them to Firestore
    for (const product of products) {
      await addDoc(productsCollection, {
        name: product.name,
        price: product.price,
        images: product.images,
        description: product.description,
        createdAt: new Date()
      });
    }
    
    alert("Successfully uploaded all products to Firebase!");
  } catch (error) {
    console.error("Error seeding database: ", error);
    alert("Error uploading to Firebase. Check console.");
  }
};
