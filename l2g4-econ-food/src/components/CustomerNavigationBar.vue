<template>
  <div class="nav">
    <ul>
      <li><a href="#">Cart</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Marketplace</a></li>
      <li><a href="#">Profile</a></li>
      
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
  float: right;
}

.nav li a:hover {
  background-color: white;
  color: green;
}

/* Style the links inside the navigation bar */
.nav a {
  display:block;
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 20px 30px 20px 30px;
  text-decoration: none;
  font-size: 17px;
  font-family: sans-serif;
}

/* Add a color to the active/current link */
.nav a.active {
  background-color: green;
  color: white;
}
</style>