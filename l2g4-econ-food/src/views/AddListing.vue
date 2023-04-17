<template>
  <MerchantNavigationBar />
  <div class="container mt-3" v-if="user">
    <div class="center">
      <div class="formDiv">
        <div class="imageDiv">
          <img
            :src="imageUrl || 'https://i.ibb.co/vhNdMn5/upload-icon.png'"
            class="listing-image"
          />
          
          <input class="mt-3" type="file" @change="onUpload" accept=".jpg,.png" />
        </div>
        <div class="inputDiv">
          <!-- <form @submit.prevent="addListing"> -->
          <form @submit.prevent="addProduct">
            <input
              type="text"
              placeholder="Name of Listing"
              v-model="name"
              required
            />
            <input
              type="number"
              placeholder="Price"
              min="0"
              step="0.01"
              v-model="price"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              v-model="quantity"
              required
            />
            <input
              type="datetime-local"
              placeholder="Best By Date"
              v-model="bestByDate"
              :min="minDate"
              required
            />
            <textarea
              placeholder="Listing Description"
              v-model="description"
            ></textarea>
            <button type="submit" id="addListing" @click=addListing()>Add Listing</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  getFirestore,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "AddListing",
  components: {
    MerchantNavigationBar
  },
  data() {
    return {
      user: false,
      publishableKey: 'pk_test_51MqfYlFyCavaBQIYQrdDrJI5LF2F6NyUmKt1MlPpG8aKmgINwC6Z0BE2mHOWVhnKMK8Qp2CMZX7s5FDjfjc7g0yH00dvVLRKBF',
      imageUrl: null,
      name: "",
      price: null,
      quantity: null,
      bestByDate: null,
      userId: null,
      description: "",
      minDate: new Date().toISOString().slice(0, -8), // remove the last 8 characters (the milliseconds and the time zone offset)
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
      if (!this.name || !this.price || !this.quantity || !this.bestByDate || !this.imageUrl) {
        alert('Please fill in all required fields.');
        return;
      }
      
      try {
        const listingsCollectionRef = collection(db, "listings");
        // add listing into Firebase collection
        const docRef = await addDoc(listingsCollectionRef, {
          name: this.name,
          price: parseFloat(this.price),
          quantity: parseInt(this.quantity),
          bestByDate: new Date(this.bestByDate).toISOString(),
          merchantId: this.userId,
          imageUrl: this.imageUrl,
          description: this.description,
        });
        alert("Listing added successfully!");
        // remove input in the fields
        this.name = "";
        this.price = null;
        this.quantity = null;
        this.bestByDate = null;
        this.imageUrl = null;
        this.description = "";
      } catch (error) {
        if (error.code === "invalid-argument") {
          alert("The selected image is too large. Please choose a smaller image.");
        } else {
          console.error(error);
          console.log(error.code);
          alert("Failed to add listing. Please try again.");
        }
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

.formDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.imageDiv {
  margin-right: 20px;
  flex-basis: 50%;
}

.listing-image {
  width: 400px;
  height: 400px;
  border: 2px solid #000;
}

.inputDiv {
  flex-basis: 40%;
}

textarea {
  height: 200px;
}

form {
  display: flex;
  flex-direction: column;
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
