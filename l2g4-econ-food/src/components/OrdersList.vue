<template>
  <div class="orders">
    <div class="order-date">
      <div class="order">
        <div class="order-content">
          <p class="order-merchant mt-2 ms-3">{{ merchant }}</p>
          <p class="order-date-time mt-1 ms-3">{{ datetime }}</p>
          <p class="order-id mt-1 mb-2 ms-3">Order #{{ orderidDisplay }}</p>
        </div>
        <div class="order-price">
          <p>${{ price.toFixed(2) }}</p>
        </div>
        <button
          @click="goSummary(orderid, status)"
          class="view-order-btn pt-3 pb-3 ps-5 pe-5 ms-2 me-1"
        >
          View Order
        </button>

        <button
          @click="goToChat(orderid)"
          class="merchant-order-chat-btn pt-3 pb-3 ps-5 pe-5 ms-1 me-3"
        >
          Chat
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrdersList",
  methods: {
    goToChat(orderId) {
      this.$router.push({ name: "OrderChat", params: { orderId: orderId } });
    },
    goSummary(orderId, status) {
      console.log("Current status is " + status);
      this.$router.push(`/customerorderstatus/${orderId}`);
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    merchant: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    orderidDisplay: {
      type: String,
      required: true,
    },
    orderid: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.order {
  border: 2px solid lightgrey;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 14px;
  background-color: #ffff;
}
.order-content {
  flex: 1;
}
.order-merchant {
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;
  font-size: 24px;
}
.order-date-time {
  font-family: "Nunito Sans", sans-serif;
  font-size: 15px;
}
.order-id {
  font-family: "Nunito Sans", sans-serif;
  font-size: 18px;
}
.view-order-btn {
  background-color: #16703c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;
  font-family: "Nunito Sans", sans-serif;
}
.merchant-order-chat-btn {
  background-color: white;
  color: black;
  border: 0.1rem solid;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;
  font-family: "Nunito Sans", sans-serif;
}
.order-price {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 30px;
  font-weight: bold;
  font-size: 24px;
  font-family: "Nunito Sans", sans-serif;
}
</style>
