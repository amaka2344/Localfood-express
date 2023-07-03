import {
  query,
  getDocs,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { auth, db } from "./firebase";

/*
  Sample cart schema
   productId (string)
   quantity (number) 
   price (number) 
   unit (string)
   userId (string)
   vendor (string)
  */

const addCart = async (cartData) => {
  try {
    const cartsCollection = collection(db, "carts");
    const newCartRef = await addDoc(cartsCollection, cartData);
    //console.log('Cart added with ID: ', newCartRef.id);
    return { success: true, message: "Item added to cart successfully" };
  } catch (error) {
    //console.error('Error adding cart: ', error);
    throw new Error(error);
  }
};

const updateCart = async (cartId, updatedData) => {
  try {
    const cartRef = doc(db, "carts", cartId);
    await updateDoc(cartRef, updatedData);
    return { success: true, message: "Cart updated successfully" };
  } catch (error) {
    //console.error('Error updating cart: ', error);
    throw new Error(error);
  }
};

const getCart = async (cartId) => {
  try {
    const cartRef = doc(db, "carts", cartId);
    const docSnapshot = await getDoc(cartRef);

    if (docSnapshot.exists()) {
      const cartData = { id: docSnapshot.id, ...docSnapshot.data() };
      return { success: true, message: "", cartData };
    } else {
      throw new Error("No cart found with the specified ID");
    }
  } catch (error) {
    //console.error('Error getting cart: ', error);
    throw new Error(error);
  }
};

const deleteCart = async (userId) => {
  try {
    const cartRef = doc(db, "carts", userId);
    await deleteDoc(cartRef);
    return { success: true, message: "Cart deleted successfully" };
  } catch (error) {
    //console.error('Error deleting cart: ', error);
    throw new Error("Error deleting cart");
  }
};

const getCartsByUserId = async (userId) => {
  try {
    const cartsCollection = collection(db, "carts");
    const q = query(cartsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cartItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log('Cart items for userId:', userId, cartItems);
      return { success: true, message: "", cartItems };
    } else {
      throw new Error("No cart items found for the specified userId");
    }
  } catch (error) {
    throw new Error("Error getting cart items: ", error);
  }
};

export { addCart, updateCart, getCart, deleteCart, getCartsByUserId };
