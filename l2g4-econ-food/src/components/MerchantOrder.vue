<template>
  <div class="merchant-order">
    <div class="merchant-order-details">
      <p><span class="merchant-order-label">Order ID:</span> {{ order.orderid }}</p>
      <p><span class="merchant-order-label">Customer:</span> {{ order.customerId }}</p>
      <p><span class="merchant-order-label">Merchant:</span> {{ order.merchantID }}</p>
      <!-- <router-link :to="{ name: 'OrderChat', params: { orderId: order.orderId } }" class="merchant-order-chat-btn">Chat</router-link> -->
        <button @click="goToChat(order.orderid)" class="merchant-order-chat-btn">Chat</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MerchantOrder",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToChat(orderId) {
      this.$router.push({ name: "OrderChat", params: { orderId: orderId } });
    },
  },
};
</script>

<style scoped>
.merchant-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #b5e1b5;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 30px;
}

.merchant-order-label {
  font-weight: bold;
}
.merchant-order-chat-btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #16703c;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  font-family: "Nunito Sans", sans-serif;
}

.merchant-order-chat-btn:hover {
  background-color: #134c2e;
}
</style>
