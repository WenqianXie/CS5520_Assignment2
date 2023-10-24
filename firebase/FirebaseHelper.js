import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "./FirebaseSetup";

export async function writeToDB(expense, id) {
  try {
    if (id) {
      await updateDoc(doc(database, "expenses", id), expense);
      console.log("Document updated with ID: ", id);
    } else {
      const docRef = await addDoc(collection(database, "expenses"), expense);
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "expenses", id));
    console.log("Document deleted with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}
