// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,  addDoc, collection, doc, setDoc, updateDoc, deleteDoc,query, getDocs, onSnapshot,where, getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBunt8doMyZVz35A3XcYly2lbADzH6-YTY",
  authDomain: "placechooser-3437d.firebaseapp.com",
  projectId: "placechooser-3437d",
  storageBucket: "placechooser-3437d.appspot.com",
  messagingSenderId: "150381887440",
  appId: "1:150381887440:web:64ea48fbf8c694e32883d5",
  measurementId: "G-LSZXZSZNWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// const analytics = getAnalytics(app);

console.log("Initialize Firebase")
// Initialize firestore
export const db = getFirestore(app)




/**
 * Save Data
 * @param {*} placeName 
 */
export const saveDataToFirebaseDatabase = (placeName) => {
  // Submit Data

  // // Insert or edit data inside collection places
  // setDoc(doc(db, "places", "0"), {
  //   name: "Agta Beach",
  // })
  //   .then(() => {
  //     console.log("Data saved successfully!");
  //   })
  //   .catch((error) => {
  //     console.log("Error on saving data: ", error);
  //   });

  //--> Submit data with addDocs method
  addDoc(collection(db, "places"), {
    name: "Cabiyay",
  })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.log("Error on saving data: ", error);
    });
}




/**
 * Update data to database
 * @param {*} placeName 
 */
export const updateDataToDatabase = (placeName) =>{
  //--> Submit data with addDocs method
  updateDoc(doc(db, "places","0"), {
    name: "DAPDAP RESIDENCE",
  })
    .then(() => {
      console.log("Data updated successfully!");
    })
    .catch((error) => {
      console.log("Error on updating data: ", error);
    });
}

/**
 * Delete Data in database
 * @param {*} placeName 
 */
export const deleteDataToDatabase = (placeName) =>{
  deleteDoc(doc(db, "places","0"))
    .then(() => {
      console.log("Data deleted successfully!");
    })
    .catch((error) => {
      console.log("Error on deleting data: ", error);
    });
}

/**
 * Fetch Data in REAL TIME. Meaning kung may changes sa database or update, automatic update sad sya
 */
export const fetchDatafromDatabase = (placeList,setPlaces) => {
  console.log("Begin fetching database data");

  setPlaces([])

   //--> 2nd Way To Extract
   const list = async () => {
    const q = query(collection(db, "places"));
    const places = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      places.push(doc.data().name);
    });
    // await setPlaces(places);
    console.log("state places: ", placeList);
  };
  list();


  


}