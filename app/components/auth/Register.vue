<template>
    <Page xmlns:stripe="nativescript-stripe">
        <ActionBar title="Login" android:flat="true"/>
        <StackLayout class="form">
          <StackLayout class="input-field">
            <TextField hint="Name" class="input" v-model="registration.name" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
        <StackLayout class="input-field">
          <TextField hint="Email" class="input" v-model="registration.email"/>
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <StackLayout class="input-field">
          <TextField hint="Password" class="input" secure="true" v-model="registration.password"/>
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <StackLayout class="input-field">
          <TextField hint="Password Confirmation" class="input" secure="true" v-model="registration.password_confirmation"/>
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <ListPicker :items="subscriptions" v-model="registration.subscription_plan" />
        <CreditCardView id="card"/>
        <Button class="btn" text="Register" @onTap="createAccount"/>
      </StackLayout>
    </Page>
</template>

<script >
  import {mapGetters,mapActions} from 'vuex'
  import {Stripe} from 'nativescript-stripe';
  import { Page } from "tns-core-modules/ui/page";
  import App from '../App'
  export default {
    data() {
      return {
        subscriptions: ['monthly','yearly'],
        registration: {}
      }
    },
    methods:{
      ...mapActions([
        'register'
      ]),
      createAccount: function(args){
        var that = this
        const view = require("tns-core-modules/ui/core/view");
        let button = args.object;
        let parent = button.parent;
        const ccView =  view.getViewById(parent,'card');
        const cc = ccView.card;
        const stripe = new Stripe('pk_test_bnoudahlg3cknoyNe3y0gjiE00v9LfMwGl');
        stripe.createToken(cc, (error,token)=>{
          if(!error){
            //Do something with your token;
            that.registration.token = token.id
            if(this.registration.subscription_plan == 0){
              this.registration.subscription_plan = 'monthly'
            }
            else{
              this.registration.subscription_plan = 'yearly'
            }
            that.register(that.registration)
            that.$navigateTo(App)

          }else{
            console.log(error);
          }
        });
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
