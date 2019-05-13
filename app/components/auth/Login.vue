<template>
    <Page>
        <ActionBar title="Login" android:flat="true"/>
        <StackLayout class="form">
        <StackLayout class="input-field">
          <TextField hint="Email" class="input" v-model="log.email" />
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <StackLayout class="input-field">
          <TextField hint="Password" class="input" secure="true" v-model="log.password" />
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <Button class="btn" text="Login" @onTap="signIn"/>
        <Button class="btn" text="Register" @onTap="$navigateTo(registerPage)"/>
      </StackLayout>
    </Page>
</template>

<script >
import {mapGetters,mapActions} from 'vuex'
import App from '../App'
import Register from './Register'
  export default {
    data() {
      return {
        registerPage: Register,
        log: {}
      }
    },
    methods:{
      ...mapActions(['login']),
      signIn: function(){
        this.login(this.log)
        this.$navigateTo(App)
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
