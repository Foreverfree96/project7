<template>{{ msg }}</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.message); // Accessing the prop within the component
  },
};
</script>
