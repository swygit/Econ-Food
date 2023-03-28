<template>
  <div class="nav">
    <ul>
      <img class="image" src="https://i.ibb.co/JypV2p6/ECON-FOOD-LOGO.png" />
      <li><a @click="profileClickRouter">Profile</a></li>
      <li><a href="#">Analytics</a></li>
      <li><a href="#">Listings</a></li>
      <li><a href="#">Orders</a></li>
      <li><a @click="dashboardClickRouter">Dashboard</a></li>
    </ul>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default {
  name: "MerchantNavigationBar",
  components: {},
  data: function () {
    return {};
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser: function () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },
    dashboardClickRouter: function () {
      this.$router.push(`/dashboard`);
    },
    profileClickRouter: function () {
      this.$router.push(`/merchantprofile`);
    },
  },
};
</script>

<style>
:root {
  font-size: 15px;
}
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

.image {
  height: 40px;
  padding-top: 8px;
  padding-left: 20px;
}

.nav {
  background-color: #16703c;
  color: white;
}

.nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.nav li {
  float: right;
}

.nav li a:hover {
  font-family: "Nunito Sans", sans-serif;
  background-color: white;
  color: #16703c;
}

/* Style the links inside the navigation bar */
.nav a {
  font-family: "Nunito Sans", sans-serif;
  display: block;
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 20px 30px 20px 30px;
  text-decoration: none;
  font-size: 12px;
}

/* Add a color to the active/current link */
.nav a.active {
  background-color: #16703c;
  color: white;
}
</style>
