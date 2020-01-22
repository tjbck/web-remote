<template>
  <div id="app">
    <div>
      <!-- As a link -->
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="/">webremote™</b-navbar-brand>
      </b-navbar>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/acc">Accelerometer</router-link>|
      <router-link to="/gyro">Gyroscope</router-link>|
      <router-link to="/lin">LinearAccelerationSensor</router-link>
    </div>-->
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col style="margin-top: 20px">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>