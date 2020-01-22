<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <AbsoluteOrientationSensor />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import AbsoluteOrientationSensor from "@/components/AbsoluteOrientationSensor.vue";

export default {
  name: "home",
  components: {
    AbsoluteOrientationSensor
  }
};
</script>
