<template>
  <div class="error">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['error']
}
</script>
<style scoped>
  .error {
    display: block;
    padding: 15px 0;
    border-radius: 5px;
    background: #f87171;
    color: #fff;
    margin: 20px 0;
    font-size: 1rem;
    text-transform: uppercase;
  }
</style>