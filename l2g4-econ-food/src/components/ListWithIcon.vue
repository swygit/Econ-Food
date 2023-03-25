<template>
  <div class="container">
    <div class="logo">
      <img :src="logoSrc" alt="Logo" />
    </div>
    <div class="header">
      <h1>{{ headerText }}</h1>
      <p>{{ descriptionText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {
    logoSrc: String,
    headerText: String,
    descriptionText: String,
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 20px;
}

.header {
  font-weight: bold;
}
</style>
