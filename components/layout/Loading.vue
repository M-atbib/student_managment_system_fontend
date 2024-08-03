<template>
  <div class="loading">
    <div class="loading__circle"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loading__circle {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #36454F;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

