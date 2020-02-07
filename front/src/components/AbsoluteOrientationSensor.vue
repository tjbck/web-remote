<template>
  <div class="AbsoluteOrientation">
    <div v-if="!error" class="float-right">
      <b-input-group prepend="AOS" class="mb-2" inline>
        <b-input-group-append is-text>
          <b-form-checkbox v-model="senserOn" switch class="mr-n2" />
        </b-input-group-append>
      </b-input-group>
    </div>
    <div v-if="error">
      <b-alert show variant="warning">AOS: {{ error }}</b-alert>
    </div>
    <em>{{ quaternion }}</em>
  </div>
</template>

<script>
export default {
  props: {
    socket: null,
    room: String
  },
  data() {
    return {
      quaternion: 0,
      senserOn: false,
      error: false
    };
  },
  methods: {
    joinRoom: function() {
      this.socket.emit("join", { room: this.room });
    }
  },
  watch: {
    quaternion: function(val) {
      if (this.senserOn) {
        this.socket.emit("sensor", { room: this.room, type: 'aos', val: val });
      }
    }
  },
  created() {
    const options = {referenceFrame: "screen"};
    let sensor = new AbsoluteOrientationSensor(options);

    // sensor.addEventListener("reading", () => {
    //   // model is a Three.js object instantiated elsewhere.
    //   model.quaternion.fromArray(sensor.quaternion).inverse();
    // });

    sensor.start();
    sensor.onreading = () => {
      // this.quaternion = sensor.quaternion;
      this.quaternion = sensor.quaternion.map(e => e.toFixed(6));
    };

    sensor.onerror = event => (this.error = event.error);
  }
};
</script>