<template>
  <div>
    <div v-if="!error" class="float-right">
      <b-input-group prepend="LAS" class="mb-2" inline>
        <b-input-group-append is-text>
          <b-form-checkbox v-model="sensorOn" switch class="mr-n2" />
        </b-input-group-append>
      </b-input-group>
    </div>
    <div v-if="error">
      <b-alert show variant="warning">LAS: {{ error }}</b-alert>
    </div>
    <p>{{sensor}}</p>
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
      sensor: [],
      sensorOn: false,
      error: false,
    };
  },
  watch: {
    sensor: function(val) {
      if (this.sensorOn) {
        this.socket.emit("sensor", { room: this.room, type: 'las', val: val });
      }
    }
  },
  created() {
    let sensor = new LinearAccelerationSensor();
    sensor.start();
    sensor.onreading = () => {
      this.sensor = [sensor.x,sensor.y,sensor.z];
    };
    sensor.onerror = event => (this.error = event.error);
  }
};
</script>
