<template>
  <button class="button" @click="onClick">{{ buttonName }}</button>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    buttonName: String,
    onClick: Function,
  },
};
</script>

<style scoped>
button {
  margin-top: 8px;
  margin-right: 10px;
  padding: 10px 20px;
  border: 0px solid #ffffff;
  color: #000000;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 1.8rem;
  font-family: "Nunito Sans", sans-serif;
  border-radius: 1.625rem;
  cursor: pointer;
}
.button:hover {
  background: #16703c;
  color: #ffffff;
}
</style>
