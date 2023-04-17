<template>
  <button class="button" @click="onClick">{{ buttonName }}</button>
</template>

<script>
export default {
  name: "NormalButton",
  props: {
    buttonName: String,
    onClick: Function,
  },
};
</script>

<style scoped>
.button {
  position: relative;
  background-color: #ffffff;
  border: none;
  font-size: 15px;
  font-family: "Nunito Sans", sans-serif;
  color: #ffffff;
  padding: 10px;
  width: 150px;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border-radius: 28px;
  color: #000000;
  border: 1px solid #16703c;
}
.button:after {
  content: "";
  background: #ffffff;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
</style>
