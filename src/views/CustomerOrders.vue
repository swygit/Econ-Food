<template>
  <CustomerNavBar></CustomerNavBar>
  <h1>Orders</h1>
  <h3>Today</h3>
  <div class="box">
    <div class="content">
      <p id="Merchant">Cold Storage - West Coast Park</p>
      <p id="Date">01/03/2023 18:45</p>
      <p id="OrderID">Order #2159</p>
    </div>
    <div class="price">
      <p>$2.83</p>
    </div>
    <button class="button" @click="handleClick">View Order</button>
  </div>
  <h3>February 17, 2023</h3>
  
  <div class="box">
    <div class="content">
      <p id="Merchant">Cold Storage - West Coast Park</p>
      <p id="Date">07/02/2023 18:45</p>
      <p id="OrderID">Order #791</p>
    </div>
    <div class="price">
      <p>$5.69</p>
    </div>
    <button class="button" @click="handleClick">View Order</button>
  </div>
</template>

<script>
//test
import CustomerNavBar from "../components/CustomerNavBar.vue";
export default {
  name: "CustomerOrders",
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito Sans");
.box {
  border: 1px solid black;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.content {
  flex: 1;
}

.button {
  background-color: #16703c;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}
.price {
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
