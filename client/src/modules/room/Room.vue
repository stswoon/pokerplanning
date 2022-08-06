<script lang="ts">

import {defineComponent} from "vue";
import Card from "@/modules/room/components/card/Card.vue";
import {roomService} from "@/modules/room/room.service";
import ScoreBoard from "@/modules/room/components/scoreboard/ScoreBoard.vue";
import Table from "@/modules/room/components/table/Table.vue";
import CardBoard from "@/modules/room/components/cardboard/CardBoard.vue";
import type {Room} from "@/modules/room/room.model";
import type {Vote} from "@/modules/room/room.model";
import router from "@/views/router";
import utils from "@/utils";

export default defineComponent({
  components: {CardBoard, Table, ScoreBoard, Card},

  data() {
    return {
      votes: [] as Vote[],
      showCards: false,
    }
  },

  methods: {
    throwCard: function (cardValue: number | string) {
      roomService.throwCard(cardValue);
    },
    clearCards: function () {
      roomService.clearCards();
    },
    flipCards: function () {
      roomService.flipCards();
    },
    changeName: function () {
      roomService.setUserName("");
      const roomId = utils.getQueryParameter("roomId");
      router.push(`/?redirectRoomId=${roomId}`);
    }
  },

  mounted(): void {
    const userName = roomService.getUserName();
    if (!userName) {
      const roomId = utils.getQueryParameter("roomId");
      router.push(`/?redirectRoomId=${roomId}`)
    } else {
      roomService.attachWsToRoom((room: Room) => {
        this.votes = Object.values(room.votes);
        this.showCards = room.showCards;
      });
    }
  }
})

</script>

<template>
  <div class="room-container">
    <div class="room-container__table">
      <Table :votes="votes" :show-cards="showCards"></Table>
    </div>
    <div class="room-container__card-board">
      <CardBoard @throwCard="throwCard"></CardBoard>
    </div>
    <div class="room-container__score-board">
      <ScoreBoard :votes="votes" :show-cards="showCards"
                  @clearCards="clearCards"
                  @flipCards="flipCards"
                  @changeName="changeName"
      ></ScoreBoard>
    </div>
  </div>
</template>


<style scoped>

.room-container {
  display: grid;
  grid-template-areas:
    "A C"
    "B C";
  align-items: center;
  grid-gap: 10px;
  grid-template-rows: auto 350px;
  grid-template-columns: auto 200px;

  margin: 10px;
  height: calc(100vh - 40px);
  min-width: 1030px;
}

.room-container__table {
  grid-area: A;
  height: 100%;
  overflow: hidden;
}

.room-container__card-board {
  grid-area: B;
  height: 100%;
  overflow: hidden;
}

.room-container__score-board {
  grid-area: C;
  height: 100%;
  overflow: hidden;
}

@media screen and (max-height: 800px) {
  .room-container {
    grid-gap: 2px;
    grid-template-rows: auto 230px;
    grid-template-columns: auto 200px;
    margin: 2px;
    height: calc(100vh - 30px);
    min-width: 900px;
    min-height: 730px;
  }
}

</style>
