<template>
  <div class="home">
    <AbsoluteOrientationSensor />
  </div>
</template>

<script>
// @ is an alias to /src
import AbsoluteOrientationSensor from '@/components/AbsoluteOrientationSensor.vue'

export default {
  name: 'home',
  components: {
    AbsoluteOrientationSensor
  }
}
</script>
