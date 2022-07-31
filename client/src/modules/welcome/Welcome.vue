<script lang="ts">
import router from "@/views/router";
import utils from "@/utils";
import {defineComponent} from 'vue'
import {roomService} from "@/modules/room/room.service";
import {v4 as uuidv4} from "uuid";

export default defineComponent({
  props: {},

  data() {
    //https://stackoverflow.com/a/57152049
    return {
      userName: null as string | null,
      createRoomButtonDisplay: false as boolean,
      createRoomButtonDisabled: true as boolean,
      backToRoomButtonDisplay: false as boolean,
      backToRoomButtonDisabled: true as boolean
    }
  },

  methods: {
    createRoom(): void {
      const roomId = uuidv4();
      router.push(`/room?roomId=${roomId}`)
    },
    backToRoom(): void {
      const redirectRoomId = utils.getQueryParameter("redirectRoomId");
      router.push(`/room?roomId=${redirectRoomId}`)
    },
    saveUserName(e: any): void {
      const userName = e.currentTarget.value;
      roomService.setUserName(userName);
      this.userName = userName;
      this.createRoomButtonDisabled = !userName;
      this.backToRoomButtonDisabled = !userName;
    }
  },

  mounted(): void {
    const redirectRoomId = utils.getQueryParameter("redirectRoomId");
    this.backToRoomButtonDisplay = !!redirectRoomId;
    this.createRoomButtonDisplay = !redirectRoomId;

    let userId = roomService.getUserId();
    if (!userId) {
      userId = uuidv4() as string;
      roomService.setUserId(userId);
    }

    const userName = roomService.getUserName();
    if (userName) {
      this.userName = userName;
      this.createRoomButtonDisabled = false;
    }
  }
})
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-form">
      <input type="text" id="userNameInput" placeholder="Enter your name"
             @keyup="saveUserName" :value="userName"/>
      <button id="createRoomButton"
              v-if="createRoomButtonDisplay"
              :disabled="createRoomButtonDisabled"
              @click="createRoom">
        Create Room
      </button>
      <button id="backToRoomButton"
              v-if="backToRoomButtonDisplay"
              :disabled="backToRoomButtonDisabled"
              @click="backToRoom">
        Back to Room
      </button>
    </div>
  </div>
</template>


<style scoped>

.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
}

.welcome-form {
  display: flex;
  border: 1px black dashed;
  height: 70px;
  border-radius: 30px;
  padding: 50px;
  background-color: beige;
}

.welcome-form > input {
  font-size: 30px;
  font-weight: bold;
}

.welcome-form > button {
  font-size: 30px;
  width: 250px;
  background-color: limegreen;
  color: white;
}

.welcome-form > button:disabled {
  background-color: lightgray;
}

.welcome-form > button:disabled:hover::after {
  content: "Enter your name first";
  /*content: attr(title);*/
  font-size: 20px;
  color: coral;
  /*position: absolute;*/
}

</style>
