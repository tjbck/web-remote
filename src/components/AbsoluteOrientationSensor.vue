<template>
  <div class="AbsoluteOrientation">
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
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <p class="lead" inline>
              room #:
              <strong>{{ room }}</strong>
            </p>
          </b-col>
          <b-col>
            <div v-if="!error" class="float-right">
              <b-input-group prepend="Sensor" class="mb-2" inline>
                <b-input-group-append is-text>
                  <b-form-checkbox v-model="turnedOn" switch class="mr-n2" />
                </b-input-group-append>
              </b-input-group>
              <!-- <em>{{ quaternion }}</em> -->
            </div>
          </b-col>
        </b-row>
      </b-container>

      <div v-if="error">
        <b-alert show variant="warning">{{ error }}</b-alert>
      </div>
      <b-button block variant="primary" @click="clientQuit()">QUIT</b-button>
      <br />
      <b-form @submit.prevent @keyup.enter="sendMsg()" inline>
        <b-input-group prepend="Message">
          <b-input type="text" v-model="message"></b-input>
          <div class="input-group-append">
            <b-button @click="sendMsg()" variant="success">Send</b-button>
          </div>
        </b-input-group>
      </b-form>
      <br />

      <b-container class="bv-example-row">
        <b-row align-h="between">
          <b-col cols="4">
            <b-button-group>
              <b-button size="lg" @touchstart="pressed('left')" @touchend="released('left')">◀</b-button>
              <b-button-group vertical>
                <b-button size="lg" @touchstart="pressed('up')" @touchend="released('up')">🔼</b-button>
                <b-button size="lg" @touchstart="pressed('down')" @touchend="released('down')">🔽</b-button>
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

      <br />

      <!-- <b-list-group>
        <b-list-group-item @touchstart="pressed('x')" @touchend="pressed('x')"> Cras justo odio</b-list-group-item>
        <b-list-group-item @touchstart="pressed('y')" @touchend="pressed('y')"> Cras justo odio</b-list-group-item>
        <b-list-group-item @touchstart="pressed('z')" @touchend="pressed('z')"> Cras justo odio</b-list-group-item>

      </b-list-group>-->

      <!-- <b-button-group>
        <b-button @touchstart="pressed('left')" @touchend="released('left')">◀</b-button>
        <b-button-group vertical>
          <b-button @touchstart="pressed('up')" @touchend="released('up')">🔼</b-button>
          <b-button @touchstart="pressed('down')" @touchend="released('down')">🔽</b-button>
        </b-button-group>
        <b-button @touchstart="pressed('right')" @touchend="released('right')">▶</b-button>
      </b-button-group>
      <br />
      <br />

      <b-button-group>
        <b-button-group vertical>
          <b-button pill @touchstart="pressed('x')" @touchend="released('x')">X</b-button>
          <b-button pill @touchstart="pressed('y')" @touchend="released('y')">Y</b-button>
        </b-button-group>
        <b-button-group vertical>
          <b-button pill @touchstart="pressed('a')" @touchend="released('a')">A</b-button>
          <b-button pill @touchstart="pressed('b')" @touchend="released('b')">B</b-button>
        </b-button-group>
      </b-button-group>
      <br />-->

      <!-- <b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('x')">X</b-button>
          <b-button pill @click="pressed('y')">Y</b-button>
          <b-button pill @click="pressed('y')">Y</b-button>
        </b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('a')">A</b-button>
          <b-button pill @click="pressed('a')">A</b-button>
          <b-button pill @click="pressed('b')">B</b-button>
        </b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('a')">A</b-button>
          <b-button pill @click="pressed('a')">A</b-button>
          <b-button pill @click="pressed('b')">B</b-button>
        </b-button-group>
      </b-button-group>-->
      <br />
      <br />
      <br />
      <!-- 
      <b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('x')">X</b-button>
          <b-button pill @click="pressed('y')">Y</b-button>
        </b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('a')">A</b-button>
          <b-button pill @click="pressed('b')">B</b-button>
        </b-button-group>
      </b-button-group>
      <b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('x')">X</b-button>
          <b-button pill @click="pressed('y')">Y</b-button>
        </b-button-group>
        <b-button-group vertical>
          <b-button pill @click="pressed('a')">A</b-button>
          <b-button pill @click="pressed('b')">B</b-button>
        </b-button-group>
      </b-button-group>-->

      <em>{{ quaternion }}</em>
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
      room: Math.floor(Math.random() * 1000).toString(),
      socket: ""
      // socket: io.connect("//192.168.0.12/")
    };
  },
  methods: {
    clientQuit: function() {
      this.socket.emit("message", { room: this.room, val: "quit" });
    },
    joinRoom: function() {
      this.socket.emit("join", { room: this.room });
    },
    pressed: function(val) {
      this.socket.emit("pressed", { room: this.room, val: val });
    },
    released: function(val) {
      this.socket.emit("released", { room: this.room, val: val });
    },
    sendMsg: function() {
      this.socket.emit("message", { room: this.room, val: this.message });
    },
    enterServer: function() {
      this.socket = io.connect("//" + this.ip + "/");
      // this.socket.emit("join", {room: this.room});
      this.entered = true;
      // alert(this.socket.id)
    }
  },
  watch: {
    // entered: function(val) {
    //   if (val) {
    //     this.socket = io.connect("//" + this.ip + "/");
    //   }
    // },
    // socket: function(){
    //   alert(this.socket.id)
    //   this.socket.emit("join", {room: this.socket.id});
    // },
    quaternion: function(val) {
      if (this.turnedOn) {
        this.socket.emit("sensor", { room: this.room, val: val });
      }
    }
  },
  created() {
    const options = { referenceFrame: "device" };
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