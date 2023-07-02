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

export { register, login, getUser };
