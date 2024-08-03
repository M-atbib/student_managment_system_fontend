<template>
  <div class="loading rounded-md shadow-sm">
    <div class="loading__circle"></div>
    <p>Chargement...</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center ;
  justify-content: center;
  gap: 10px;
  position: fixed;
  bottom: 1.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 18ch;
  max-width: 100%;
  padding: 10px 15px;
  background-color: #36454f;
  font-weight: 700;
  color: #f3f3f3;
  z-index: 1000;
}

.loading__circle {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #36454f;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
