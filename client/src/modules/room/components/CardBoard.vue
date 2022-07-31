<script lang="ts">

import {defineComponent} from "vue";
import Card from "@/modules/room/components/card/Card.vue";

let avCards = [
  0, {value: 0.5, displayText: "1/2"},
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 30, "?"
];
avCards = avCards.map((el: any) => {
  if (el.value) {
    return el;
  } else {
    return {value: el, displayText: el};
  }
})

export default defineComponent({
  components: {Card},
  emits: ["throwCard"],
  data() {
    return {avCards}
  }
})

</script>


<template>
  <div class="card-board">
    <button class="card" v-for="card in avCards" @click="this.$emit('throwCard', card.value)">
      <Card :value="card.value" :displayText="card.displayText"></Card>
    </button>
  </div>
</template>


<style scoped>

.card-board {
  /*height: 60%;*/
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.card-board > .card {
  /*height: calc(50% - 2px);*/
  width: calc(12% - 1px);
  margin: 1px;
  border: 0;
  padding: 0;
  background-color: transparent;
}

.card-board > .card:hover {
  opacity: 50%;
}

</style>
