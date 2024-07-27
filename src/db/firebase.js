import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJW2mRhuSzI1i1-yaOldK_4lD71yPu0lM",
  authDomain: "notesapp-8ca86.firebaseapp.com",
  projectId: "notesapp-8ca86",
  storageBucket: "notesapp-8ca86.appspot.com",
  messagingSenderId: "203524455709",
  appId: "1:203524455709:web:4611d547aa9c454e8135f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notesRef = collection(db, "notes");

const fetchDataFromDB = async () => {
    const snapshot = await getDocs(notesRef);
    const notes = [];

    snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes;
};

const addNoteToDB = async (newNote) => {
    await addDoc(notesRef, newNote);
    console.log("new note added");
};

const deleteNoteFromDB = async (id) => {
    const docRef = doc(db, "notes", id);

    await deleteDoc(docRef);
    console.log("Document deleted");
};

export { fetchDataFromDB, deleteNoteFromDB, addNoteToDB };