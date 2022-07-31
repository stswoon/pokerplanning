<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  props: ["userName", "display", "displayName", "order"]
})

</script>


<template>
  <div class="user-container" :class="{'user-in-line': display === 'line'}">
    <div v-if="displayName === 'up'">{{ userName }}</div>
    <div class="user" :style="{ 'background-image': `icons/u${order}.png`}"></div>
    <div v-if="displayName === 'down' || display === 'line'">{{ userName }}</div>
  </div>
</template>


<style scoped>

.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user {
  height: 65px;
  width: 65px;
  background-image: url("icons/u1.png");
  background-size: 100% 100%;
}

.user-in-line {
  flex-direction: row;
  align-items: stretch;
}

.user-in-line > .user {
  margin: 0 1px 0 0;
  height: 35px;
  width: 35px;
}

</style>
