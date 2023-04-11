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
      <div class="listing-info">
        <div class="listing-header">
          <h2 class="listing-name">{{ listing.name }}</h2>
          <div class="listing-buttons">
            <p>Quantity</p>
            <button class="quantity-button" @click="decrementQuantity">-</button>
            <input
              type="number"
              class="quantity-input"
              v-model.number="quantity"
            />
            <button class="quantity-button" @click="incrementQuantity">+</button>
          </div>
        </div>
        <div class="listing-details">
          <p class="listing-price">$ {{ listing.price.toFixed(2) }}</p>
          <p class="listing-best-by">Best By: {{ formattedBestByDateTime }}</p>
        </div>
      </div>
      <div class="listing-buttons">
        <button class="delete-button" @click="deleteListing">Delete</button>
        <button class="save-button" @click="updateQuantity">Save</button>
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
  background-color: #f5f5ef;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 400px;
  margin: 16px;
}

.listing-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.listing-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.listing-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
}

.listing-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.listing-name {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.listing-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.quantity-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16703c;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0px 8px;
}

.quantity-input {
  font-size: 20px;
  text-align: center;
  width: 60px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
}

.listing-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
}

.listing-price {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
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
  margin-top: 16px;
}

.save-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16703c;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #16703c;
}

.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff1f01;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #ff8c69;
}
</style>
