<template>
  <div class="orders">
    <div class="order-date">
      <div class="order">
        <div class="order-content">
          <p class="order-merchant">{{ merchant }}</p>
          <p class="order-date-time">{{ datetime }}</p>
          <p class="order-id">Order {{ orderid }}</p>
        </div>
        <div class="order-price">
          <p>{{ price }}</p>
        </div>
        <button class="view-order" @click="handleClick">View Order</button>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
export default {
  name: "OrdersList",
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
@import url("https://fonts.googleapis.com/css?family=Nunito Sans");
.order {
  border: 1px solid black;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.order-content {
  flex: 1;
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
  margin-right: 10px;
}
</style>
