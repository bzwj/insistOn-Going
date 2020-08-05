<template>
  <div id="app">
    <vue-particles
        color="#ffffff"
      :particleOpacity="0.7"
      :particlesNumber="120"
      shapeType="circle"
      :particleSize="4"
      linesColor="#ffffff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
      >
      </vue-particles>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
#particles-js {
  background-color: rgb(176, 209, 240);
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>