<template>

<div id='nav'>
  <router-link to="/">Landing</router-link>
  <router-link to="/Register">Register</router-link>
  <router-link to="/Login">Login</router-link>
  <router-link to="/CustomerLandingTest">CustomerLandingTest</router-link>
  <router-link to="/AddListing">AddListing</router-link>
  <router-link to="/MerchantListings">MerchantListings</router-link>
</div>
<router-view/>  
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
</style>
