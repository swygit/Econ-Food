<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>Reducing food waste and</h1>
        <h1>providing affordable food</h1>
        <h1>options. One pickup at a time.</h1>
        <br />
        <router-link to="/login">
          <button class="signin">Sign In</button>
        </router-link>
        <router-link to="/register">
          <button class="register">Register</button>
        </router-link>
      </div>
      <div class="topleft">
        <img src="../assets/logowhite.png" class="logo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingHeader",
};

</script>

<style scoped>  
@import url('https://fonts.googleapis.com/css?family=Nunito Sans');

.header {
  background-image: url('../assets/bg2png.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.header::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.4)
}

.title {
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
  font-size: 47px;
  font-weight: normal;
  font-family: 'Nunito Sans';
  color: #fff;
  margin-bottom: 10px;
  margin-top: 0px;
}

.signin {
  background-color: #16703c;
  color: #fff;
  font-family: "Nunito Sans";
  border-radius: 5px;
  border-color: white;
  padding: 10px 60px 10px;
  font-size: 20px;
  cursor: pointer;
  width: 190px;
  text-align: center;
}

.register {
  background-color: rgba(255, 255, 255, 0.7);;
  color: black;
  font-family: 'Nunito Sans';
  border-radius: 5px;
  border-color: white;
  padding: 10px 60px 10px;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 10px;
  cursor: pointer;
  width: 190px;
  text-align: center;
}

.icon {
  width: 200px;
  height: 200px;
}

.logo {
  width: 200px;
  height: 100px;
}
</style>