<template>
  <div>
    <input v-model="turnedOn" type="checkbox" />
    {{ turnedOn }}
    <p>{{ error }}</p>
    <p>{{ quaternion }}</p>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      quaternion: 0,
      turnedOn: false,
      error: "no error",
      socket: io.connect("https://192.168.0.12/")
    };
  },
  methods: {
    changeName: function() {
      this.name = "Flavius";
    }
  },
  watch: {
    turnedOn: function(val) {
      if (val) {
        this.socket.emit("a", 'helo');
      }
    }
  },
  created() {

    let sensor = new AbsoluteOrientationSensor();

    // sensor.addEventListener("reading", () => {
    //   // model is a Three.js object instantiated elsewhere.
    //   model.quaternion.fromArray(sensor.quaternion).inverse();
    // });

    sensor.start();
    sensor.onreading = () => {
      this.quaternion = sensor.quaternion.map(e => e.toFixed(3));
    };

    sensor.onerror = event => (this.error = event.error);
  }
};
</script>
