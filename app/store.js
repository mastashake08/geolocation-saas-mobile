import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    watcher: 0
  },
  mutations: {
    getUser(state,user){
      state.user = user
    },
    login(state){

    },
    addLocation(state,location){
      state.user.locations.push(location)
    },
    deleteLocation(state,index){
      state.user.locations.splice(1,index)
    },
    startLocationTracking(state,watcher){
      state.watcher = watcher
    },
    stopLocationTracking(state){
      geolocation.clearWatch(state.watcher)
    }
  },
  actions: {
    getUser(context){
      axios.post('https://geolocation.jyroneparker.com/api/user').then(data => {
        context.commit('getUser', data.data)
      });
    },
    login({commit,dispatch},payload){
      axios.post('https://geolocation.jyroneparker.com/api/login',{email:payload.email, password: payload.password}).then(data => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.access_token}`;
        let token = require( "nativescript-localstorage" )
        token.setItem('token',data.data.access_token)
        dispatch('getUser')
        commit('login')
      })
    },
    register({commit,dispatch},payload){
      axios.post('https://geolocation.jyroneparker.com/api/register',{email:payload.email, password: payload.password, name: payload.name, token: payload.token, subscription_plan: payload.subscription_plan}).then(data => {
        console.log(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.access_token}`;
        let token = require( "nativescript-localstorage" )
        token.setItem('token',data.data.access_token)
        dispatch('getUser')
        commit('login')
      }).catch(err => {
        console.log(err)
      })
    },
    addLocation(context,location){
      axios.post('https://geolocation.jyroneparker.com/api/location',location).then(data => {
        context.commit('addLocation',data.data)
      })
    },
    deleteLocation(context,payload){
      axios.delete('https://geolocation.jyroneparker.com/api/location/'+payload.location.id).then(data => {
        context.commit('deleteLocation',payload.index)
      })
    },
    startLocationTracking(context){
      geolocation.enableLocationRequest().then(() =>{
        context.commit('startLocationTracking',geolocation.watchLocation((location) =>{
          console.log(location);
        }))
      });

    },
    stopLocationTracking(context){
      context.commit('stopLocationTracking')
    }
  }
});
