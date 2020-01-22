<template>
  <div class="AbsoluteOrientation">
    <div v-if="!entered">
      <b-form inline>
        <b-input-group prepend="IP Address">
          <b-input type="text" v-model="ip"></b-input>
          <div class="input-group-append">
            <b-button @click="entered = true" variant="success">Connect</b-button>
          </div>
        </b-input-group>
      </b-form>
    </div>

    <div v-else>
      <b-form inline>
        <b-input-group prepend="Message">
          <b-input type="text" v-model="message"></b-input>
          <div class="input-group-append">
            <b-button @click="socket.emit('keyboard', message)" variant="success">Send</b-button>
          </div>
        </b-input-group>
      </b-form>
      <br />

      <div v-if="!error">
        <b-input-group size="lg" prepend="Switch" class="mb-2">
          <b-input-group-append is-text>
            <b-form-checkbox v-model="turnedOn" switch class="mr-n2" />
          </b-input-group-append>
        </b-input-group>
        <em>{{ quaternion }}</em>
      </div>

      <div v-else>
        <b-alert show variant="warning">{{ error }}</b-alert>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      message: "",
      quaternion: 0,
      entered: false,
      turnedOn: false,
      error: false,
      ip: window.location.hostname,
      socket: ""
      // socket: io.connect("//192.168.0.12/")
    };
  },
  methods: {
    changeName: function() {
      this.name = "Flavius";
    }
  },
  watch: {
    entered: function(val) {
      if (val) {
        this.socket = io.connect("//" + this.ip + "/");
      }
    },
    quaternion: function(val) {
      if (this.turnedOn) {
        this.socket.emit("sensor", val);
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
      // this.quaternion = sensor.quaternion;
      this.quaternion = sensor.quaternion.map(e => e.toFixed(3));
    };

    sensor.onerror = event => (this.error = event.error);
  }
};
</script>