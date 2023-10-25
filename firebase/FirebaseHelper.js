import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "./FirebaseSetup";
// this is a helper function to write to the database, update the database and delete from the database

export async function writeToDB(expense, id) {
  try {
    if (id) {
      // if the id exists, update the document
      await updateDoc(doc(database, "expenses", id), expense);
      console.log("Document updated with ID: ", id);
    } else {
      // if the id does not exist, add the document
      const docRef = await addDoc(collection(database, "expenses"), expense);
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "expenses", id)); // delete the document
    console.log("Document deleted with ID: ", id);
  } catch (err) {
    console.log(err);
  }
}
