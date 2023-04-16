<template>
  <div v-if="this.listing.quantity > 0 && new Date() < new Date(this.listing.bestByDate)">
    <div class="listing-card">
      <div class="listing-image-container">
        <img
          :src="
            listing.imageUrl ||
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3ANo_image_available.svg&psig=AOvVaw1ess-dyR_hgsRPHT6PMAIe&ust=1681050910109000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMD4suLAmv4CFQAAAAAdAAAAABAQ'
          "
          class="listing-image" alt="Picture Unavailable"
        />
      </div>
      <div class="listing-info mt-3">
        <div class="listing-header">
          <h2 class="listing-name">{{ listing.name }}</h2>
        </div>
        <div class="listing-details">
          <p class="listing-price mt-1">$ {{ listing.price.toFixed(2) }}</p>
          <p class="listing-best-by mt-1">Best By: {{ formattedBestByDateTime }}</p>
        </div>
        <div class="listing-buttons mt-5">
          <p class="me-4">Quantity</p>
          <button class="quantity-button" id="decrease" @click="decrementQuantity">-</button>
          <input
            type="number"
            id="number"
            class="quantity-input"
            v-model.number="quantity"
          />
          <button class="quantity-button" id="increase" @click="incrementQuantity">+</button>
        </div>
      </div>
      <div class="listing-buttons mt-4">
        <button class="delete-button mt-2 me-2" @click="deleteListing">Delete</button>
        <button class="save-button mt-2 ms-2" @click="updateQuantity">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
export default {
  name: "TheListing",
  props: {
    listing: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: this.listing.quantity,
    };
  },
  mounted() {
    this.listenForQuantityUpdates();
  },
  computed: {
    formattedBestByDateTime() {
      const date = new Date(this.listing.bestByDate);
      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return date.toLocaleDateString(undefined, options);
    },
  },
  methods: {
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    async deleteListing() {
      if (confirm("Are you sure you want to delete this listing?")) {
        try {
          const listingRef = doc(db, "listings", this.listing.id);
          await deleteDoc(listingRef);
          alert("Listing deleted successfully!");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("Failed to delete listing. Please try again later.");
        }
      }
    },
    async deleteListingNoConfirm() {
        try {
          const listingRef = doc(db, "listings", this.listing.id);
          await deleteDoc(listingRef);
          alert("Listing deleted successfully!");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("Failed to delete listing. Please try again later.");
        }
    },
    async updateQuantity() {
      try {
        const listingRef = doc(db, "listings", this.listing.id);
        await updateDoc(listingRef, {
          quantity: this.quantity,
        });
        alert("Quantity updated successfully!");

        if (this.quantity === 0) {
          alert("New Quantity is now 0, this will delete the listing.");
          await this.deleteListingNoConfirm();
        }
      } catch (error) {
        console.error(error);
        alert("Failed to update quantity. Please try again later.");
      }
    },
    async listenForQuantityUpdates() {
      const listingRef = doc(db, "listings", this.listing.id);
      const unsubscribe = onSnapshot(listingRef, (doc) => {
        const updatedListing = doc.data();
        if (updatedListing.quantity === 0) {
          this.deleteListingNoConfirm();
          unsubscribe(); // Stop listening after the listing has been deleted
        } else {
          this.quantity = updatedListing.quantity;
        }
      });
    },
  },
};
</script>

<style scoped>
.listing-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  height: 60rem;
  width: 38rem;
  margin: 10px;
}

.listing-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  /* overflow: hidden; */
}

.listing-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.listing-info {
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.listing-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.listing-name {
  font-family: "Nunito Sans", sans-serif;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}

.listing-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.quantity-button {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  font-family: "Nunito Sans", sans-serif;
  font-size: 3rem;
  font-weight: bold;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#decrease {
  border-radius: 18px 0 0 18px;
  background-color: #16703c;
  color: #ffffff;
}
#increase {
  border-radius: 0 18px 18px 0;
  background-color: #16703c;
  color: #ffffff;
}
.quantity-input {
  font-size: 20px;
  text-align: center;
  height: 5rem;
  width: 6rem;
  border: 1px solid #ccc;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.listing-details {
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.listing-price {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.listing-best-by {
  font-size: 14px;
  text-align: center;
}

.save-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.save-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16703c;
  border: none;
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 10px 20px 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #1e924e;
}

.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cc1b04;
  border: none;
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 10px 20px 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #f85625;
}
</style>
