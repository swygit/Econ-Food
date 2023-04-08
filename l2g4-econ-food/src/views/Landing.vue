<template>
  <div class="container">
    <div class="center">
      <h1>Reducing food waste and</h1>
      <h1>providing affordable food</h1>
      <h1>options. One pickup at a time.</h1>
      <router-link to="/aboutCustomer">
        <button class="about">I'M A CUSTOMER</button>
      </router-link>
      <router-link to="/aboutMerchant">
        <button class="about">I'M A MERCHANT</button>
      </router-link>
    </div>
    <div class="topleft">
      <img src="https://i.ibb.co/rkSWW2b/ECON-FOOD.png" class="icon" />
    </div>
    <div class="topright">
      <router-link to="/login">
        <button class="signin">Sign In / Register</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Landing",
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito Sans");
.container {
  background-image: url("https://i.ibb.co/C69CYVs/Landing-Register-Login-Page.png");
  background-size: cover;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.container::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.25);
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.topleft {
  position: relative;
  top: 0;
  left: 0;
}

.topright {
  position: fixed;
  top: 10px;
  right: 10px;
  text-align: center;
}

h1 {
  font-size: 30px;
  font-weight: normal;
  font-family: "Nunito Sans";
  color: #fff;
  margin-bottom: 30px;
}

.signin {
  background-color: #a9a9a9;
  color: #fff;
  font-family: "Nunito Sans";
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
}

.about {
  background-color: transparent;
  border: 2px solid #fff;
  font-family: "Nunito Sans";
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}

.login-link {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 18px;
  text-decoration: none;
}

.icon {
  width: 200px;
  height: 200px;
}
</style>
