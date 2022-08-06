<script lang="ts">

import {defineComponent} from "vue";
import Card from "@/modules/room/components/card/Card.vue";

let avCards = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 30, "?"];
avCards = avCards.map((el) => {
  return {value: el, cardBack: true};
})

export default defineComponent({
  components: {Card},
  emits: ["throwCard"],
  data() {
    return {avCards};
  },
  mounted() {
    this.avCards.forEach((card, index) => {
      setTimeout(() => card.cardBack = false, 1000 + index * 100);
    })
  }
})

</script>


<template>
  <div class="card-board">
    <button class="card" v-for="card in avCards"
            @click="this.$emit('throwCard', card.value)">
      <Card :value="card.value" :card-shirt="card.cardBack"></Card>
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
  /*width: 120px;*/
  margin: 1px;
  border: 0;
  padding: 0;
  background-color: transparent;
}

.card-board > .card:hover {
  opacity: 50%;
  transition: all .1s ease-in;
  transform: translateY(-10px);
}

</style>
