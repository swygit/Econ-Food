<template>
  <div class="container">
    <div class="row">
      <div class="topleft">
        <a href="/">
          <img src="../assets/logoblack.png" class="logo" alt="Logo" />
        </a>
      </div>

      <div class="col-left">
        <v-col class="center">
          <h1>As a Merchant...</h1>

          <ListWithIcon
            image-src="src/assets/merchant-icon-1.png"
            image-alt="merchant-icon-1"
            header="POST"
            description="Upload a listing of your surplus food onto the marketplace"
          />

          <br />

          <ListWithIcon
            image-src="src/assets/merchant-icon-2.png"
            image-alt="merchant-icon-2"
            header="CONNECT"
            description="Chat with a customer to arrange a self pickup time in store"
          />

          <br />

          <ListWithIcon
            image-src="src/assets/merchant-icon-3.png"
            image-alt="merchant-icon-3"
            header="DELIVER"
            description="Excess food sold at a reduced price, alleviating loss incurred from food wastage"
          />

          <br />

          <div class="center-div">
            <router-link to="/login">
              <button class="signin">Sign In / Register</button>
            </router-link>
          </div>
        </v-col>
      </div>

      <div class="col-right">
        <img
          src="../assets/about-merchant.png"
          alt="Image"
          class="half-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ListWithIcon from "../components/ListWithIcon.vue";

export default {
  name: "AboutMerchant",
  components: {
    ListWithIcon,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito Sans");

.container {
  background-size: cover;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: #f5f5ef;
}

.center {
  max-width: 450px;
}

h1 {
  font-weight: normal;
  font-family: "Nunito Sans";
  color: black;
  margin-bottom: 30px;
  font-size: 23px;
}

h2 {
  font-weight: normal;
  font-family: "Nunito Sans";
  color: black;
  margin-bottom: 5px;
  font-size: 23px;
  font-weight: bold;
}

p {
  font-weight: normal;
  font-family: "Nunito Sans";
  color: black;
  margin-bottom: 30px;
  font-size: 13.9px;
}

.logo {
  width: 180px;
  height: 90px;
}

.row {
  display: flex;
}

.col-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.col-right {
  flex: 1;
}

.half-image {
  width: 50vw;
  height: 100vh;
}

.icon {
  width: 70px;
  height: 70px;
  margin: 10px;
}

.signin {
  background-color: #16703c;
  color: #fff;
  font-family: "Nunito Sans";
  border: none;
  border-radius: 28px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
}

.center-div {
  text-align: center;
}
</style>
