<template>
<div id='nav'>
  Oops! This page has not been developed yet. Click the above links to navigate to the developed pages.<br>
  <router-link to="/">Landing</router-link><br>
  <router-link to="/Register">Register</router-link><br>
  <router-link to="/Login">Login</router-link><br>
  <router-link to="/ForgotPassword">ForgotPassword</router-link>
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
