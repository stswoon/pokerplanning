<script lang="ts">

import {defineComponent} from "vue";
import User from "@/modules/room/components/user/User.vue";
import type {Vote} from "@/modules/room/room.model";

export default defineComponent({
  components: {User},
  emits: ["clearCards", "flipCards", "changeName"],
  props: {
    votes: {type: Array, default: []},
    showCards: {type: Boolean, default: false}
  },

  methods: {
    cardValueDisplay: function (vote: Vote) {
      if (this.showCards) {
        return vote.cardValue == null ? "no card" : vote.cardValue;
      } else {
        return  vote.cardValue == null ? "waiting" : "??";
      }
    }
  },

  computed: {
    average: function () {
      const tmp = this.votes.filter((vote: any) => typeof vote.cardValue === "number");
      let average: number = tmp.reduce((acc: number, vote: any) => acc + vote.cardValue, 0);
      average = average / tmp.length;
      average = Math.round(average * 10) / 10;
      return average;
    }
  }
})

</script>


<template>
  <div class="scoreboard">
    <button @click="this.$emit('clearCards')">Clear cards</button>
    <button @click="this.$emit('flipCards')">Flip cards</button>
    <hr/>
    <div class="average">Average: {{ showCards ? average : "??" }}</div>
    <hr/>
    <div>
      <div class="scoreboard__user-line" v-for="(vote, index) in votes">
        <span><User :user-name="vote.userName" :display="'line'" :order="index+1"></User></span>
        <span>:&nbsp;</span>
        <span>{{ cardValueDisplay(vote) }}</span>
      </div>
    </div>
    <hr/>
    <button @click="this.$emit('changeName')">Change name</button>
  </div>
</template>

<style scoped>

.scoreboard .average {
  font-size: 30px;
  font-weight: bold;
}

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
