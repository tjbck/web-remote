<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <div v-if="!entered">
          <b-form @submit.prevent @keyup.enter="enterServer()" inline>
            <b-input-group prepend="IP Address">
              <b-input type="text" v-model="ip"></b-input>
              <b-input type="text" v-model="room"></b-input>
              <div class="input-group-append">
                <b-button @click="enterServer()" variant="success">Connect</b-button>
              </div>
            </b-input-group>
          </b-form>
        </div>
        <div v-else>
          <b-container>
            <b-row>
              <b-col>
                <p class="lead" inline>
                  room #:
                  <strong>{{ room }}</strong>
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-input-group @submit.prevent @keyup.enter="sendMsg()">
                <b-input type="text" v-model="message"></b-input>
                <b-input-group-append>
                  <b-button @click="sendMsg()" variant="success">Send</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-row>
          </b-container>

          <br />
          <b-button block variant="primary" @click="cmd('quit')">QUIT</b-button>
          <b-button block variant="primary" @click="cmd('calibrate')">CALIBRATE</b-button>
          <br />

          <b-container class="bv-example-row">
            <b-row align-h="between">
              <b-col cols="4">
                <b-button-group>
                  <b-button size="lg" @touchstart="pressed('left')" @touchend="released('left')">◀</b-button>
                  <b-button-group vertical>
                    <b-button size="lg" @touchstart="pressed('up')" @touchend="released('up')">🔼</b-button>
                    <b-button
                      size="lg"
                      @touchstart="pressed('down')"
                      @touchend="released('down')"
                    >🔽</b-button>
                  </b-button-group>
                  <b-button size="lg" @touchstart="pressed('right')" @touchend="released('right')">▶</b-button>
                </b-button-group>
              </b-col>
              <b-col cols="4">
                <b-button-group>
                  <b-button-group vertical>
                    <b-button size="lg" @touchstart="pressed('x')" @touchend="released('x')">X</b-button>
                    <b-button size="lg" @touchstart="pressed('y')" @touchend="released('y')">Y</b-button>
                  </b-button-group>
                  <b-button-group vertical>
                    <b-button size="lg" @touchstart="pressed('a')" @touchend="released('a')">A</b-button>
                    <b-button size="lg" @touchstart="pressed('b')" @touchend="released('b')">B</b-button>
                  </b-button-group>
                </b-button-group>
              </b-col>
            </b-row>
          </b-container>

          <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
          <div class="mt-3">
            Selected:
            <strong>{{ selected }}</strong>
          </div>

          <AbsoluteOrientationSensor v-if="selected == 'aos'" style="margin-top: 20px" :socket="socket" :room="room" />
          <Gyroscope v-else-if="selected == 'gryo'" style="margin-top: 20px" :socket="socket" :room="room" />
          <Accelerometer v-else-if="selected == 'acc'" style="margin-top: 20px" :socket="socket" :room="room" />
          <LinearAccelerationSensor v-else-if="selected == 'las'" style="margin-top: 20px" :socket="socket" :room="room" />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import io from "socket.io-client";
// @ is an alias to /src
import AbsoluteOrientationSensor from "@/components/AbsoluteOrientationSensor.vue";
import Gyroscope from "@/components/Gyroscope.vue";
import Accelerometer from "@/components/Accelerometer.vue";
import LinearAccelerationSensor from "@/components/LinearAccelerationSensor.vue";

export default {
  name: "home",
  components: {
    AbsoluteOrientationSensor,
    Gyroscope,
    Accelerometer,
    LinearAccelerationSensor
  },
  data: function() {
    return {
      ip: window.location.hostname,
      room: Math.floor(Math.random() * 1000).toString(),
      entered: false,
      message: "",
      socket: "",
      selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'aos', text: 'AbsoluteOrientationSensor' },
          { value: 'gryo', text: 'Gyroscope' },
          { value: 'acc', text: 'Accelerometer' },
          { value: 'las', text: 'LinearAccelerationSensor' }
        ]
    };
  },
  methods: {
    cmd: function(command) {
      this.socket.emit("cmd", { room: this.room, val: command });
    },
    sendMsg: function() {
      this.socket.emit("message", { room: this.room, val: this.message });
    },
    pressed: function(val) {
      this.socket.emit("pressed", { room: this.room, val: val });
    },
    released: function(val) {
      this.socket.emit("released", { room: this.room, val: val });
    },
    enterServer: function() {
      this.socket = io.connect("//" + this.ip + "/");

      // this.socket.emit("join", {room: this.room});
      this.entered = true;
    }
  }
};
</script>
