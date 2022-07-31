<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  props: [
    "cardShirt", "rotateAngle", "value", "displayText", "nonVisible",
    "showAnimation", "flipCardAnimation"
  ],

  data: function() {
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
    <div class="card"
         :class="{ '_card-shirt': cardShirt, '_non-visible': nonVisible }"
         :style="{ 'transform': `rotate(${rotateAngle}deg)`}">
      <span>{{ cardShirt ? "" : displayText }}</span>
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
  background-image: url("card.jpg");
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  display: flex;
}

.card > span {
  color: coral;
  font-size: 70px;
  font-weight: bold;
}

.card._card-shirt {
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

</style>
