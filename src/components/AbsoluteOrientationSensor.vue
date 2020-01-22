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
      <p class="lead">
        room #:
        <strong>{{ room }}</strong>
      </p>
      <b-form @submit.prevent @keyup.enter="sendMsg()" inline>
        <b-input-group prepend="Message">
          <b-input type="text" v-model="message"></b-input>
          <div class="input-group-append">
            <b-button @click="sendMsg()" variant="success">Send</b-button>
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

      <b-button-group>
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
      </b-button-group>
      <br/>
      <br/>
      <br/>


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
      </b-button-group>
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
    joinRoom: function() {
      this.socket.emit("join", { room: this.room });
    },
    pressed: function(val){
      this.socket.emit("pressed", { room: this.room, val: val });
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