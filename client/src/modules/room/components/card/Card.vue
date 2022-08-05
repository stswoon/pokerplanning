<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  props: [
    "cardShirt", "rotateAngle", "value", "displayText", "nonVisible",
    "showAnimation", "flipCardAnimation"
  ],

  data: function () {
    return {
      showAnimationState: this.showAnimation
    }
  },

  watch: {
    value: function (newValue, oldValue) {
      if (newValue != oldValue) {
        const animationClass = this.showAnimationState === 'UP' ? "_run-transformation-up" : "_run-transformation-down"
        const element = this.$el;
        //https://css-tricks.com/restart-css-animation/
        element.classList.remove(animationClass);
        void element.offsetWidth; // triggering reflow "The actual magic"
        element.classList.add(animationClass);
      }
    }
  },

  mounted() {
    console.debug("mount");
  }
})

</script>


<template>
  <div class="card-container"
       :class="{
    '_run-transformation-up': this.showAnimationState === 'UP',
    '_run-transformation-down': this.showAnimationState === 'DOWN',
    '_run-flip-animation': flipCardAnimation
  }">
    <div class="flip-card card"
         :class="{ '_non-visible': nonVisible, 'flip-card-show': cardShirt }"
         :style="{ 'transform': `rotate(${rotateAngle}deg)`}">
      <div class="flip-card-inner">
        <div class="flip-card-back">
          <img>
        </div>
        <div class="flip-card-front">
          <span v-html="displayText"> </span>
          <p>&half;</p>
        </div>
      </div>

      <!--      <div class="card"-->
      <!--           :class="{ '_card-back': cardShirt, '_non-visible': nonVisible }"-->
      <!--           :style="{ 'transform': `rotate(${rotateAngle}deg)`}">-->
      <!--        <span>{{ cardShirt ? "" : displayText }}</span>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped>

.card {
  height: 150px;
  width: 100px;
  margin: 10px;
  text-align: center;
  /*font-size: 25px;*/
  background-size: 100% 100%;
  /*//background-image: url("card.jpg");*/
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  display: flex;
}

.flip-card-front {
  background-size: 100% 100%;
  background-image: url("card.jpg");
}
.flip-card-front > span {
  color: coral;
  font-size: 70px;
  font-weight: bold;

}

.card ._card-back {
  background-size: 100% 100%;
  background-image: url("card-back.png");
}

.flip-card-back > img {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  background-image: url("card-back.png");
}

.card._non-visible {
  visibility: hidden;
}

._run-transformation-up {
  position: relative;
  animation: _transformation-up-animation 1s ease-in;
}

@keyframes _transformation-up-animation {
  from {
    opacity: 0;
    top: 10vh;
    /*transform: rotate(0deg);*/
  }
  to {
    opacity: 1;
    top: 0;
    /*transform: rotate(5000deg);*/
  }
}

._run-transformation-down {
  position: relative;
  animation: _transformation-down-animation 1s ease-in;
}

@keyframes _transformation-down-animation {
  from {
    opacity: 0;
    top: -10vh;
  }
  to {
    opacity: 1;
    top: 0;
  }
}

._run-flip-animation {
  animation: _flip-animation 1s ease-in;
}

@keyframes _flip-animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(5000deg);
  }
}


.flip-card {
  background-color: transparent;
  height: 150px;
  width: 100px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card-show .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  /*background-color: #bbb;*/
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}

</style>
