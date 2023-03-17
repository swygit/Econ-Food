<template>
  <div class="nav">
    <ul>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Marketplace</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Cart</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomerNavigationBar"
};
</script>

<style scoped>
.nav {
  background-color: green;
  color: white;
}

.nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.nav li {
  float: left;
}

.nav li a {
  display: block;
  padding: 16px;
  text-decoration: none;
}

.nav li a:hover {
  background-color: white;
  color: green;
}
</style>