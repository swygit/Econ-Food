<template>
  <div class="nav">
    <ul>
      <div class="logo-container">
      <a href="/dashboard">
      <img class="image" src="../assets/logowhite.png" />
      </a>
      </div>
      <li><a class="links-right" @click="profileClickRouter">Profile</a></li>
      <li><a class="links-right" @click="listingsClickRouter">Listings</a></li>
      <li><a class="links-right" @click="ordersClickRouter">Orders</a></li>
      <li><a class="links-right" @click="dashboardClickRouter">Dashboard</a></li>
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
    listingsClickRouter: function () {
      this.$router.push(`/merchantlistings`);
    },
    ordersClickRouter: function () {
      this.$router.push(`/merchantorders/${this.user.uid}`);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

:root {
  font-size: 15px;
}

.image {
  height: 7.2rem;
  margin-top: 0.3rem;
  margin-left: 2rem;
}

.logo-container {
  float: left;
}

.nav {
  background-color: #16703c;
  color: white;
  cursor: pointer
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
.links-right {
  font-family: "Nunito Sans", sans-serif;
  display: block;
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 20px 30px 20px 30px;
  text-decoration: none;
  font-size: 2rem;
}

/* Add a color to the active/current link */
.nav a.active {
  background-color: #16703c;
  color: white;
}
</style>
