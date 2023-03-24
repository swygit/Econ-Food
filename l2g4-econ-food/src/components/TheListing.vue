<template>
  <div class="listing">
    <div class="listing__image-container">
      <img class="listing__image" :src="imageUrl" alt="">
    </div>
    <div class="listing__content">
      <h2 class="listing__title">{{ name }}</h2>
      <p class="listing__best-by">Best by {{ bestBy }}</p>
      <p class="listing__price">{{ price | formatPrice }}</p>
      <div class="listing__quantity-container">
        <p class="listing__quantity-label">Quantity:</p>
        <div class="listing__quantity-buttons">
          <button class="listing__quantity-button" @click="decrementQuantity">-</button>
          <input class="listing__quantity-input" type="number" :value="quantity" @input="updateQuantity(+event.target.value)" min="0">
          <button class="listing__quantity-button" @click="incrementQuantity">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateDoc, doc } from 'firebase/firestore';

export default {
  name: 'TheListing',
  props: {
    id: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    bestBy: {
      type: String,
      required: true
    }
  },
  filters: {
    formatPrice(value) {
      return `$${value.toFixed(2)}`;
    }
  },
  methods: {
    async updateQuantity(quantity) {
      const listingRef = doc(this.$firebase.firestore, String(this.$parent.useremail)+'listings', this.name);
      await updateDoc(listingRef, { quantity: parseInt(quantity, 10) });
    },
    incrementQuantity() {
      const newQuantity = this.quantity + 1;
      this.updateQuantity(newQuantity);
      this.quantity = newQuantity;
    },
    decrementQuantity() {
      const newQuantity = Math.max(0, this.quantity - 1);
      this.updateQuantity(newQuantity);
      this.quantity = newQuantity;
    }
  }
}
</script>

<style>
.listing {
  display: flex;
  background-color: #f1f6f2;
  border: 1px solid #dce0db;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.listing__image-container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 0 0 8px;
}

.listing__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.listing__content {
  padding: 1rem;
  flex: 1;
}

.listing__title {
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #3b6b
}
</style>