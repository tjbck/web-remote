<template>
  <div>
    <p>{{ error }}</p>
    <p>Gyroscope X-axis: {{ x }}</p>
    <p>Gyroscope Y-axis: {{ y }}</p>
    <p>Gyroscope Z-axis: {{ z }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      z: 0,
      error: 'no error'
    };
  },
  created() {
    let sensor = new Gyroscope();
    sensor.start();

    sensor.onreading = () => {
      this.x = sensor.x;
      this.y = sensor.y;
      this.z = sensor.z;
    };

    sensor.onerror = event =>
      this.error = event.error
  }
};
</script>
