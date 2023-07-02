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
  Sample order schema
    userId (string)
    vendorId (string)
    status (String enum: ["pending","processing","delivering","completed","rejected","cancelled"])
    orderedAt (DateTime)
    address (string)
    longitude (number) 
    latitude (number) 
    comment (string)
    orderId (string)
    distanceCharged (number)
    deliveryAmount (number)
    cart (String Array[{},{}]) stringified array of products [{productName:"", price:0, unitName:"", quantity: 0, subTotal:0}]
    deliveryDate (DateTime)
    deliveryType (string)
    transactionId (string)
    assignedDispatch (string) userId
    cartAmount (number) 
    amountCharged (number)
    discountSlashed (number)
    couponUsed (boolean)
    coupon (string)
    deleted (boolean)
    paid (boolean)
  */

const addOrder = async (order) => {
  try {
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, order);
    console.log("Order added with ID: ", docRef.id);
    return { success: true, message: "Order created" };
  } catch (error) {
    throw new Error("Error adding order: ", error);
  }
};

const updateOrder = async (orderId, updatedData) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, updatedData);
    return { success: true, message: "Order updated successfully" };
  } catch (error) {
    throw new Error("Error updating order: ", error);
  }
};

const getAllOrders = async () => {
  try {
    const ordersCollection = collection(db, "orders");
    const querySnapshot = await getDocs(ordersCollection);

    if (!querySnapshot.empty) {
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("All orders:", orders);
      return { success: true, message: "", orders };
    } else {
      throw new Error("No orders found");
    }
  } catch (error) {
    throw new Error("Error getting orders: ", error);
  }
};

const getOrderById = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const docSnapshot = await getDoc(orderRef);

    if (docSnapshot.exists()) {
      const orderData = docSnapshot.data();
      return { success: true, message: "", orderData };
    } else {
      throw new Error("No order found with the specified ID");
    }
  } catch (error) {
    throw new Error("Error getting order: ", error);
  }
};

const getOrdersByStatus = async (status) => {
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, where("status", "==", status));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, message: "", orders };
    } else {
      throw new Error("No order found with the specified status");
    }
  } catch (error) {
    throw new Error("Error getting orders: ", error);
  }
};

const getOrdersByVendorId = async (vendorId) => {
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, where("vendorId", "==", vendorId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, message: "", orders };
    } else {
      throw new Error("No orders found with the specified vendor ID");
    }
  } catch (error) {
    throw new Error("Error getting orders: ", error);
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, message: "", orders };
    } else {
      throw new Error("No orders found with the specified user ID");
    }
  } catch (error) {
    throw new Error("Error getting orders: ", error);
  }
};

const deleteOrder = async (orderId, updatedData) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, updatedData);
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting order: ", error);
  }
};

export {
  addOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
  getOrdersByVendorId,
  getOrdersByUserId,
  deleteOrder,
};
