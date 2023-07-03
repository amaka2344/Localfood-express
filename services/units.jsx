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
  Sample unit schema
   name (string)
   abbreviation (string)
  */

const addUnit = async (unit) => {
  try {
    const unitsCollection = collection(db, "units");
    const docRef = await addDoc(unitsCollection, unit);
    return { success: true, message: "Unit has been added successfully" };
  } catch (error) {
    throw new Error("Error adding unit");
  }
};

const updateUnit = async (unitId, updatedData) => {
  try {
    const unitRef = doc(db, "units", unitId);
    await updateDoc(unitRef, updatedData);
    return { success: true, message: "Unit updated successfully" };
  } catch (error) {
    throw new Error("Error updating unit");
  }
};

const getAllUnits = async () => {
  try {
    const unitsCollection = collection(db, "units");
    const querySnapshot = await getDocs(unitsCollection);

    if (!querySnapshot.empty) {
      const units = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, message: "", units };
    } else {
      throw new Error("No units found");
    }
  } catch (error) {
    throw new Error("Error getting units");
  }
};

const getUnitById = async (unitId) => {
  try {
    const unitRef = doc(db, "units", unitId);
    const docSnapshot = await getDoc(unitRef);
    if (docSnapshot.exists()) {
      const unitData = docSnapshot.data();
      return { success: true, message: "", unitData };
    } else {
      throw new Error("No unit found with the specified ID");
    }
  } catch (error) {
    throw new Error("Error getting unit");
  }
};

const deleteUnit = async (unitId, updatedData) => {
  try {
    const unitRef = doc(db, "units", unitId);
    await updateDoc(unitRef, updatedData);
    return { success: true, message: "Unit deleted successfully" };
  } catch (error) {
    throw new Error("Error updating unit");
  }
};

export { addUnit, updateUnit, getAllUnits, getUnitById, deleteUnit };
