import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Accelerometer from '@/views/Accelerometer.vue'
import Gyroscope from '@/views/Gyroscope.vue'
import LinearAccelerationSensor from '@/views/LinearAccelerationSensor.vue'
import AbsoluteOrientationSensor from '@/views/AbsoluteOrientationSensor.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/acc',
    name: 'acc',
    component: Accelerometer
  },
  {
    path: '/gyro',
    name: 'gyro',
    component: Gyroscope
  },
  {
    path: '/lin',
    name: 'lin',
    component: LinearAccelerationSensor
  },
  {
    path: '/aos',
    name: 'aos',
    component: AbsoluteOrientationSensor
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
