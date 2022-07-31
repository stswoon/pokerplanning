<script lang="ts">

import {defineComponent} from "vue";
import Card from "@/modules/room/components/card/Card.vue";
import User from "@/modules/room/components/user/User.vue";

export default defineComponent({
  components: {Card, User},
  props: {
    votes: {type: Array, default: []},
    showCards: {type: Boolean, default: false}
  },

  data() {
    return {}
  },

  computed: {
    voteUp: function () {
      const tmp = this.votes.filter((el: any, i: number) => i % 2 === 0);
      return tmp;
    },
    voteDown: function () {
      const tmp = this.votes.filter((el: any, i: number) => i % 2 !== 0);
      return tmp;
    }
  }
})

</script>


<template>

  <div class="table-container">

    <div class="table-bench" id="bench-up">
      <User v-for="vote in voteUp" :userName="vote.userName" :display-name="'up'"></User>
    </div>

    <div class="table">
      <div class="table__left"></div>
      <div class="table__middle">
        <div class="table__middle-up">
          <Card v-for="vote in voteUp"
                :value="vote.cardValue"
                :display-text="vote.cardValue"
                :rotateAngle="vote.rotateAngle"
                :cardShirt="!showCards"
                :non-visible="vote.cardValue == null"
                :show-animation="'DOWN'"
          ></Card>
        </div>
        <div class="table__middle-down">
          <Card v-for="vote in voteDown"
                :value="vote.cardValue"
                :display-text="vote.cardValue"
                :rotateAngle="vote.rotateAngle"
                :cardShirt="!showCards"
                :non-visible="vote.cardValue == null"
                :show-animation="'UP'"
          ></Card>
        </div>
      </div>
      <div class="table__right"></div>
    </div>

    <div class="table-bench" id="bench-down">
      <User v-for="vote in voteDown" :userName="vote.userName" :display-name="'down'"></User>
    </div>

  </div>

</template>

<style scoped>

.table-container {
  border: 1px solid black;
  background-color: beige;
  border-radius: 30px;
  height: calc(100% - 2px);
}

.table {
  margin: 5px 10px;
  display: flex;
  justify-content: space-around;
}

.table-bench {
  display: flex;
  height: 80px;
  margin: 0 190px 0 260px;

  justify-content: space-around;
  align-items: center;
}

.table {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.table__left {
  background-image: url("table-left.png");
  background-size: 100% 100%;
  width: 260px;
  height: 400px;
}

.table__middle {
  background-image: url("table-middle.png");
  background-size: 100% 100%;
  width: calc(100% - 450px);
  height: 400px;
}

.table__middle-up, .table__middle-down {
  height: 50%;
  display: flex;

  justify-content: space-around;
  align-items: center;
}

.table__right {
  background-image: url("table-right.png");
  background-size: 100% 100%;
  width: 190px;
  height: 400px;
}

</style>
