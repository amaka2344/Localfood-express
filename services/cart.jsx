import {
  query,
  getDocs,
  where,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
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
    const updatedData = { deleted: true };
    const querySnapshot = await getDocs(
      query(collection(db, "carts"), where("userId", "==", userId))
    );
    querySnapshot.forEach(async (doc) => {
      const cartRef = doc.ref;
      await updateDoc(cartRef, updatedData);
    });
    return { success: true, message: "Cart deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting cart");
  }
};

const deleteSingleCart = async (cartId) => {
  try {
    alert(cartId);
    const updatedData = { deleted: true };
    const querySnapshot = await getDocs(
      query(collection(db, "carts"), where("cid", "==", cartId))
    );
    querySnapshot.forEach(async (doc) => {
      const cartRef = doc.ref;
      alert(JSON.stringify(cartRef));
      //await deleteDoc(cartRef);
      await updateDoc(cartRef, updatedData);
    });
    return { success: true, message: "Cart deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting cart");
  }
};

const getCartsByUserId = async (userId) => {
  try {
    const cartsCollection = collection(db, "carts");
    const q = query(
      cartsCollection,
      where("userId", "==", userId),
      where("deleted", "==", false)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cartItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log('Cart items for userId:', userId, cartItems);
      return { success: true, message: "", cartItems };
    } else {
      return { success: false, message: "No cart items found for the specified userId"};
    }
  } catch (error) {
    throw new Error("Error getting cart items: ", error);
  }
};

export {
  addCart,
  updateCart,
  getCart,
  deleteCart,
  deleteSingleCart,
  getCartsByUserId,
};
