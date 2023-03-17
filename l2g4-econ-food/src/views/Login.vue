<template>
  <form>
    <input type="text" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <input type="submit" value="Login as Customer" />
    <div class="toggle">Or <a href="">login as Merchant</a></div>
  </form>
</template>
<script>
export default {
  name: "Login",
};
</script>
<style scoped>
form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #999;
}
input[type="text"],
input[type="password"] {
  display: block;
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #999;
  font-size: 16px;
  font-family: Arial, sans-serif;
}
input[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-family: Arial, sans-serif;
  cursor: pointer;
}
.toggle {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-family: Arial, sans-serif;
}
</style>
