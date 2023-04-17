<template>
  <div class="row">
    <div class="col">
      <img :src="imageSrc" :alt="imageAlt" class="icon">
    </div>
    <div class="col">
      <h2>{{ header }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListWithIcon',
  props: {
    imageSrc: String,
    imageAlt: String,
    header: String,
    description: String
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito Sans');

h2 {
  font-weight: normal;
  font-family: 'Nunito Sans';
  color: black;
  margin-bottom: 5px;
  font-size: 3.1rem;
  font-weight: bold;
}

p {
  font-weight: normal;
  font-family: 'Nunito Sans';
  color: black;
  margin-bottom: 30px;
  font-size: 2.1rem;
}

.icon {
  width: 70px;
  height: 70px;
  margin: 10px;
}
</style>
