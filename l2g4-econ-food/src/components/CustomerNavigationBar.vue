<template>
  <div class="nav">
    <ul>
      <div class="logo-container">
      <a href="/marketplace">
      <img class="image" src="../assets/logowhite.png" />
      </a>
      </div>
      <li><a class="links-right" @click="toProfile">Profile</a></li>
      <li><a class="links-right" @click="toCart">Cart</a></li>
      <li><a class=" links-right" @click="toOrders">Orders</a></li>
      <li><a class="links-right" @click="toMarketplace">Marketplace</a></li>
      <li><a class="links-right" @click="toWallet">Wallet</a></li>
    </ul>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default {
  name: "CustomerNavigationBar",
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
    toMarketplace: function () {
      this.$router.push(`/marketplace`);
    },
    toProfile: function () {
      this.$router.push(`/customerprofile`);
    },
    toCart: function () {
      this.$router.push(`/cart/${this.user.uid}`);
    },
    toOrders: function () {
      this.$router.push(`/customerorders/${this.user.uid}`);
    },
    toWallet: function () {
      this.$router.push("/wallet");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

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
}

.nav ul {
  list-style-type: none;
  overflow: hidden;
}
.nav li {
  float: right;
  cursor: pointer;
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
