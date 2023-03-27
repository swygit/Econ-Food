<template>
  <MerchantNavBar />
  <div class="container" v-if="user">
    <div class="center">
      <div class="formDiv">
        <div class="imageDiv">
          <img :src="imageUrl || 'https://i.ibb.co/vhNdMn5/upload-icon.png'" class="listing-image" /><br />
          <input type="file" @change="onUpload" accept=".jpg,.png" />
        </div>
        <div class="inputDiv">
          <form @submit.prevent="addListing">
            <input type="text" placeholder="Name of Listing" v-model="name" required />
            <input type="number" placeholder="Price" min="0" step="0.01" v-model="price" required />
            <input type="number" placeholder="Quantity" min="0" v-model="quantity" required />
            <input type="datetime-local" placeholder="Best By Date" v-model="bestByDate" required />
            <button type="submit" id="addListing">Add Listing</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavBar from "@/components/MerchantNavBar.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, getDoc, addDoc, getDocs, updateDoc, collection, doc, query, where } from "firebase/firestore";
import firebaseApp from "../firebase.js";
import router from "../router";

const db = getFirestore(firebaseApp);

export default {
  name: "AddListingNew",
  components: {
    MerchantNavBar,
  },
  data() {
    return {
      user: false,
      imageUrl: null,
      name: "",
      price: null,
      quantity: null,
      bestByDate: null,
      userId: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
      }
    });
  },
  methods: {
    async addListing() {
      try {
        const listingsCollectionRef = collection(db, "listings"); 
        const docRef = await addDoc(listingsCollectionRef, {
          name: this.name,
          price: parseFloat(this.price),
          quantity: parseInt(this.quantity),
          bestByDate: new Date(this.bestByDate).toISOString(),
          merchantId: this.userId
        });
        if (this.imageUrl) {
          // upload image to storage and associate with the listing document
        }
        alert("Listing added successfully!");
        this.name = "";
        this.price = null;
        this.quantity = null;
        this.bestByDate = null;
        this.imageUrl = null;
      } catch (error) {
        console.error(error);
        alert("Failed to add listing. Please try again later.");
      }
    },
    onUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },
  },
};
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5ef;
    background-size: cover;
    position: relative;
  }
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
  }
  .imageDiv {
    margin-top: 20px;
  }
  .profileDiv {
    margin-left: 20px;
  }
  .formDiv {
    margin-left: 20px;
  }
  .MerchantNavBar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .merchant-image {
    width: 500px;
    height: 500px;
    border: 2px solid #000;
  }
  .listing-image {
    width: 300px;
    height: 300px;
    border: 2px solid #000;
  }
  input[type="file"] {
    font-family: "Nunito Sans";
    font-size: 16px;
  }
  input[type="file"]::-webkit-file-upload-button {
    font-family: "Nunito Sans";
    font-size: 16px;
    color: #fff;
    background-color: #16703c;
    padding: 10px 15px;
    border-radius: 30px;
    cursor: pointer;
    outline: none;
  }
  input[type="text"],
  input[type="number"],
  input[type="datetime-local"],
  input[type="tel"],
  textarea {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 0px 5px #999;
    font-size: 16px;
    font-family: "Nunito Sans";
  }
  button[type="submit"],
  button[type="button"] {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 0px 5px #999;
    background-color: #16703c;
    color: #fff;
    font-size: 16px;
    font-family: "Nunito Sans";
    cursor: pointer;
  }
  button[type="button"] {
    background-color: transparent;
    color: #000;
    border: 2px solid #16703c;
  }
</style>