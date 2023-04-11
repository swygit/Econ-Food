<template>
  <CustomerNavigationBar />
  <div class="container">
    <div class="top-container">
      <div class="top-image-container">
        <img src="@/images/coldstorage.jpg" />
      </div>
      <div class="text">
        <h1>Cold Storage - West Coast Park</h1>
        <h2>71 W Coast Hwy, Singapore 126844</h2>
        <h2>Open 24 hours</h2>
      </div>
    </div>

    <h3>Cart Summary</h3>
    <div class="middle-content">
      <div class="middle-left-content">
        <h2>Basket of Lemons - x1</h2>
        <h4>Subtotal</h4>
        <h4>GST</h4>
        <h4>Total</h4>
      </div>
      <p></p>
      <div class="middle-right-content">
        <h2 style="margin-left: auto">$3.00</h2>
        <h4 style="margin-left: auto">$10.00</h4>
        <h4 style="margin-left: auto">$0.50</h4>
        <h4 style="margin-left: auto">$10.50</h4>
      </div>
    </div>

    <div class="bottom-container">
      <NormalButtonUnfilled
        @click="backToCart"
        :buttonName="backToCartButton"
      ></NormalButtonUnfilled>
      <div>
        <p></p>
      </div>
      <NormalButton
        @click="placeOrder"
        :buttonName="orderButtonName"
      ></NormalButton>
    </div>
  </div>
</template>

<script>
import NormalButton from "@/components/NormalButton.vue";
import NormalButtonUnfilled from "@/components/NormalButtonUnfilled.vue";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";

export default {
  name: "IndividualProduct",
  components: {
    NormalButton,
    NormalButtonUnfilled,
    CustomerNavigationBar,
  },
  data: function () {
    return {
      orderButtonName: "Place Order",
      backToCartButton: "Back to Cart",
    };
  },
  props: {},
  methods: {
    backToCart: function () {
      //
    },
    placeOrder: function () {
      //   console.log("hi");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

:root {
  font-size: 8px;
}
body {
  background-color: #f5f5ef;
}
h1 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 25px;
  font-weight: 700;
}
h2 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
}
h3 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 20px;
  margin-right: 170px;
}
h4 {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  letter-spacing: 2%;
  line-height: 24px;
  font-size: 15px;
}
p {
  padding: 25px 50px;
}
.container {
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr 1fr 1fr; */
  background-color: #ffffff;
  /* margin: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-image-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.middle-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.middle-left-content {
  justify-content: left;
  display: flex;
  align-items: left;
  flex-direction: column;
}
.middle-right-content {
  justify-content: right;
  display: flex;
  align-items: right;
  flex-direction: column;
}
.middle-content {
  justify-content: right;
  display: flex;
  align-items: right;
}
img {
  width: 280px;
  height: 180px;
}
.bottom-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
}
.text {
  font-size: 70px;
}
</style>
