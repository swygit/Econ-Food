<template>
  <div class="nav">
    <ul>
      <img class="image" src="@/images/logo.png" />
      <li><a href="#">Cart</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Marketplace</a></li>
      <li><a href="#">Profile</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomerNavigationBar",
};
</script>

<style scoped>
:root {
  font-size: 15px;
}
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,900&display=swap");

.image {
  height: 50px;
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
  font-size: 11px;
}

/* Add a color to the active/current link */
.nav a.active {
  background-color: #16703c;
  color: white;
}
</style>
