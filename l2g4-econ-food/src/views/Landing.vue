<template>
  <div>
    <div class="container">
      <h1>Econ Food</h1>
        <router-link to="/login">
            <button>Get Started</button>
        </router-link>
    </div>
  </div>
</template>
<script>
export default {
    name: "Landing"
}
</script>
<style scoped>
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    h1 {
        font-size: 48px;
        font-weight: bold;
        color: #000000;
        margin-bottom: 30px;
    }
    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 24px;
        cursor: pointer;
    }
    .login-link {
        position: absolute;
        top: 20px;
        right: 20px;
        color: #fff;
        font-size: 18px;
        text-decoration: none;
    }
</style>
