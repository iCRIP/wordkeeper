import Vue from 'vue'
import App from './App.vue'

import VueFire from 'vuefire'
import firebase from 'firebase/app';

import store from '@/store';

import BaseModal from '@/components/BaseModal'

import 'firebase/auth';
import 'firebase/database';

Vue.use(VueFire)

Vue.component('BaseModal', BaseModal);

var config = {
  apiKey: "AIzaSyDnFJ2mWmm3-nUut9aFyLuNJMAXsC0kBeg",
  authDomain: "wordkeeper-61ef1.firebaseapp.com",
  databaseURL: "https://wordkeeper-61ef1.firebaseio.com",
  projectId: "wordkeeper-61ef1",
  storageBucket: "wordkeeper-61ef1.appspot.com",
  messagingSenderId: "241488038530"
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

Vue.config.productionTip = false

new Vue({
  store,
  
  render: h => h(App)
}).$mount('#app')
