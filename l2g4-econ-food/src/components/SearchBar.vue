<template>
  <div class="search-bar">
    <input
      id="search"
      type="search"
      class="search"
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
.search-bar {
  text-align: left;
  margin-top: 4rem;
  font-size: 15px;
}

.search-bar input {
  padding: 2rem;
  min-width: 40rem;
  outline: none;
  border: none;
  border-radius: 1.625rem;
  width: 100%;
}
</style>
