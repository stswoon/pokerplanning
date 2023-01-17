<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  props: ["userName", "display", "displayName", "order"],

  computed: {
    backgroundImage: function () {
      const imgUrl = new URL(`./icons/u${this.order}.png`, import.meta.url).href
      return 'url(' + imgUrl + ')';
    }
  }
})

</script>


<template>
  <div class="user-container" :class="{'user-in-line': display === 'line'}">
    <div class="user-name" v-if="displayName === 'up'">{{ userName }}</div>
    <div class="user" style="'q:q'" :style="{ 'background-image': backgroundImage}"></div>
    <div class="user-name" v-if="displayName === 'down' || display === 'line'">{{ userName }}</div>
  </div>
</template>


<style scoped>

.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  /*transition: all 5.5s;*/
}

.user {
  height: 55px;
  width: 55px;
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

.user-name {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-height: 800px) {
  .user {
    height: calc(65px * var(--media-scale));
    width: calc(65px * var(--media-scale));
  }
}

</style>
