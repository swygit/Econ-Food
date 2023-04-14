<template>
  <div class="search-bar">
    <input
      id="search"
      type="search"
      class="search-input"
      placeholder="Search"
      v-model="payload"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: function () {
    return {
      payload: "",
    };
  },
  watch: {
    payload: function () {
      this.$emit("searchPayloadEvent", this.payload);
    },
  },
};
</script>

<style scoped>
.search-bar input {
  padding: 2rem 0rem 2rem 6rem;
  min-width: 10rem;
  border-radius: 1.625rem;
  width: 100%;
}
.search-input {
  height: 48px;
  border-bottom: 3px solid #ddd;
  border-radius: 0;
  font-size: 18px;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
  font-family: "Nunito Sans", sans-serif;
  background: white url("../assets/search-icon.svg") no-repeat 15px center;
  background-size: 2.2rem 2.2rem;
}
.search-input:focus {
  border-bottom-color: #16703c;
}
</style>
