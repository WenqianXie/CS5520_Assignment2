import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "./FirebaseSetup";

export async function writeToDB(expense) {
  try {
    const docRef = await addDoc(collection(database, "expenses"), expense);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}
