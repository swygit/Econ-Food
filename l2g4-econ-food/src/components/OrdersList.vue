<template>
  <div class="orders">
    <div class="order-date">
      <div class="order">
        <div class="order-content">
          <p class="order-merchant">{{ merchant }}</p>
          <p class="order-date-time">{{ datetime }}</p>
          <p class="order-id">Order #{{ orderid }}</p>
        </div>
        <div class="order-price">
          <p>${{ price }}</p>
        </div>
        <router-link to="/aboutMerchant">
          <button class="view-order" @click="handleClick">View Order</button>
        </router-link>
        <button @click="goToChat(orderid)" class="merchant-order-chat-btn">Chat</button>
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
      type: String,
      required: true,
    },
    orderid: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
  },
};
</script>

<style scoped>
.order {
  border: 1px solid black;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #ffff;
}

.order-content {
  flex: 1;
}
p {
  margin-top: 0;
  margin-bottom: 10px;
}
.order-merchant {
  font-weight: bold;
  font-size: 20px;
}
.order-date-time {
  font-size: 15px;
}

.order-id {
  font-size: 18px;
}
.view-order {
  background-color: #16703c;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}
.order-price {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
  font-weight: bold;
  font-size: 20px;
}
</style>
