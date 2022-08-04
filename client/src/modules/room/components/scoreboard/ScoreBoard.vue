<script lang="ts">

import {defineComponent} from "vue";
import User from "@/modules/room/components/user/User.vue";
import type {Vote} from "@/modules/room/room.model";

export default defineComponent({
  components: {User},
  emits: ["clearCards", "flipCards"],
  props: {
    votes: {type: Array, default: []},
    showCards: {type: Boolean, default: false}
  },

  methods: {
    cardValueDisplay: function (vote: Vote) {
      if (this.showCards) {
        return vote.cardValue || "no card";
      } else {
        if (vote.cardValue) {
          return "??";
        } else {
          return "waiting"
        }
      }
    }
  },

  computed: {
    average: function () {
      const tmp = this.votes.filter((vote: any) => typeof vote.cardValue === "number");
      let average: number = tmp.reduce((acc: number, vote: any) => acc + vote.cardValue, 0);
      average = average / tmp.length;
      return average;
    }
  }
})

</script>


<template>
  <div class="scoreboard">
    <button @click="this.$emit('clearCards')">Clear cards</button>
    <button @click="this.$emit('flipCards')">Flip cards</button>
    <div>Average: {{ showCards ? average : "??" }}</div>
    <div>
      <div class="scoreboard__user-line" v-for="(vote, index) in votes">
        <span><User :user-name="vote.userName" :display="'line'" :order="index"></User></span>
        <span>:&nbsp;</span>
        <span>{{ cardValueDisplay(vote) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.scoreboard {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /*position: absolute;*/
  right: 0;
  height: 100%;
  width: 100%;
  border: 1px solid black;
  background-color: #b5b7ee;
}

.scoreboard > div, .scoreboard > button {
  margin: 5px;
  font-size: 20px;
  /*background-color: limegreen;*/
  /*color: white;*/
}

.scoreboard__user-line {
  display: flex;
  flex-direction: row;
}

</style>
