import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/auth/Login'
import store from './store';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('CreditCardView',() => require('nativescript-stripe').CreditCardView);
let token = require( "nativescript-localstorage" )

let home = Login
if((token.getItem('token') || null) == null){
  home = App
}
new Vue({
  store,
  render: h => h('frame', [h(home)])
}).$start()
