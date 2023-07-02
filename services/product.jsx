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
  Sample product schema
      productName: productDetails.productName,
      description: productDetails.description,
      userId: userId,
      price: productDetails.price,
      unitId: productDetails.unitId,  
      stockQuantity: productDetails.stockQuantity,
      packagingTime: productDetails.packagingTime,
      deleted: productDetails.deleted,
      availabilityStatus: productDetails.availabilityStatus;
      published: true,
      photos: ""
  */

const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    //console.log('Product created with ID: ', docRef.id);
    return { success: true, message: "Product added successfully" };
  } catch (error) {
    throw new Error(error);
  }
};

const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, message: "", products };
  } catch (error) {
    throw new Error(error);
  }
};

const getProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(productRef);

    if (docSnapshot.exists()) {
      const productData = { id: docSnapshot.id, ...docSnapshot.data() };
      return { success: true, message: "", productData };
    } else {
      throw new Error("No product found with the specified ID");
    }
  } catch (error) {
    throw new Error(error);
  }
};

/*
const productId = 'product123';
const updatedData = {
  price: 20,
  stockQuantity: 200,
  published: false,
};
*/
const updateProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    throw new Error(error);
  }
};

/*
const productId = 'product123';
const updatedData = {
  deleted: true
};
*/
const deleteProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    throw new Error(error);
  }
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
