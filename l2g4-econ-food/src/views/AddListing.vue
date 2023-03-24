<template>
    <div>
      <h1 class="add-listing-title">Add Listing</h1>
      <form @submit.prevent="addListing">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" v-model="quantity" required>
        </div>
        <div class="form-group">
          <label for="best-by">Best by:</label>
          <input type="datetime-local" id="best-by" v-model="bestBy" required>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" step="0.01" id="price" v-model="price" required>
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" ref="image" @change="onImageSelected">
        </div>
        <button type="submit" v-on:click="addListing">Add Listing</button>
      </form>
    </div>
  </template>
  
  <script>
    import firebaseApp from "../firebase.js";
    import { getFirestore } from "firebase/firestore";
    import { doc, setDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "@firebase/auth";
    // import { db, storage } from '../firebase';

    const db = getFirestore(firebaseApp);
  
  export default {
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.useremail = auth.currentUser.email;
            this.user = user;
        }
        });
    },
    data() {
      return {
        name: '',
        quantity: 0,
        bestBy: '',
        price: 0,
        image: null,
        imageUrl: null
      }
    },
    methods: {
      async addListing() {        
        const docRef = await setDoc(doc(db, String(this.useremail) + "listings", this.name), {
          name: this.name,
          quantity: parseInt(this.quantity),
          bestBy: this.bestBy,
          price: parseFloat(this.price),
          imageUrl: this.imageUrl
        });
        this.$router.push('/');
      },
      onImageSelected(event) {
        const file = event.target.files[0];
        const storageRef = storage.ref(`images/${file.name}`);
        const uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', () => {}, () => {}, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.imageUrl = downloadURL;
          });
        });
      }
    }
  }
  </script>
  
  <style scoped>
    .add-listing-title {
    font-size: 36px;
    font-family: 'Nunito Sans', sans-serif;
    margin-bottom: 20px;
    }
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="number"],
  input[type="datetime-local"],
  input[type="file"] {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    background-color: #c7e9c0; /* Update to green color */
  }
  
  button[type="submit"] {
    margin-top: 10px;
    padding: 10px;
    background-color: #2ca25f; /* Update to green color */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #006d2c; /* Update to darker green color */
  }
  </style>
  