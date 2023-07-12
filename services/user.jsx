import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  query,
  getDocs,
  where,
  addDoc,
  doc,
  getDoc,
  collection,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import Fuse from "fuse.js";
import { geocodeAddress, uploadImage } from "./misc";

const register = async (userDetails) => {
  try {
    // Create user with email and password (firebase standard auth)
    const res = await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );
    const user = res.user;
    //check if user document exist in users collection
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const selectedUser = await getDocs(q);
    if (selectedUser.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        email: userDetails.email,
        userName: userDetails.userName,
        userType: "customer",
        uid: user.uid,
      });
      return { success: true, message: "Registration successful" };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const registerVendor = async (userDetails) => {
  try {
    // Create user with email and password (firebase standard auth)
    const res = await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );
    const user = res.user;
    //check if user document exist in users collection
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const selectedUser = await getDocs(q);
    if (selectedUser.docs.length === 0) {
      //geocode address
      const address = await geocodeAddress(userDetails.address);
      const longitude = address?.features[0]?.geometry?.coordinates[0];
      const latitude = address?.features[0]?.geometry?.coordinates[1];
      //upload logo to cloudinary
      const image = await uploadImage(userDetails.logo);

      await addDoc(collection(db, "users"), {
        email: userDetails.email,
        userName: userDetails.restaurantName,
        userType: "vendor",
        uid: user.uid,
        address: userDetails.address,
        logo: image,
        latitude: latitude,
        longitude: longitude,
        averageRating: 5,
        totalRatingScore: 0,
        totalOrders: 0,
        balance: 0,
        shippingFeeRatePerMile: 30,
        storeAvailability: true,
      });

      return { success: true, message: "Registration successful" };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (userDetails) => {
  try {
    // Login user with email and password (firebase standard auth)
    const { user } = await signInWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );

    //get extra user record from the users collection
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = {
        userName: userDoc.data().userName,
        email: userDoc.data().email,
        uid: user.uid,
        userType: userDoc.data().userType,
        //add any other things like token (later)
      };
      return { success: true, message: "", userData };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      const userData = { id: docSnapshot.id, ...docSnapshot.data() };
      return { success: true, message: "", userData };
    } else {
      throw new Error("No user found with the specified ID");
    }
  } catch (error) {
    throw new Error("Error getting user: ", error);
  }
};

const getVendor = async (vendorId) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", vendorId))
    );
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const userData = { id: docSnapshot.id, ...docSnapshot.data() };
      return { success: true, message: "", userData };
    } else {
      throw new Error("No user found with the specified email");
    }
  } catch (error) {
    throw new Error("Error getting user: ", error);
  }
};

const getVendors = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("userType", "==", "vendor"))
    );
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, message: "", users };
  } catch (error) {
    throw new Error(error);
  }
};

const searchVendors = async (searchTerm) => {
  try {
    //get all vendors first
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("userType", "==", "vendor"))
    );
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    const options = {
      keys: ["userName", "address"],
      threshold: 0.3 // Specify the keys to search in your restaurant objects
    };
    const fuse = new Fuse(users, options);
    const results = fuse.search(searchTerm);
    const restaurants = results.map((result) => result.item);
    return { success: true, message: "", restaurants };
  } catch (error) {
    throw new Error(error);
  }
};

const getLoggedInUser = async () => {
  try {
    let user = localStorage.getItem("loggedInUser");
    if (user !== null || user !== undefined) {
      user = JSON.parse(user);
      return user;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

const logOutUser = async () => {
  try {
    localStorage.removeItem("loggedInUser");
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  register,
  login,
  getUser,
  registerVendor,
  getVendors,
  getVendor,
  searchVendors,
  getLoggedInUser,
  logOutUser,
};
