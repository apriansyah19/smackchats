<template>
  <q-page class="q-pa-sm flex flex-center">
      <!-- <q-card> -->
         <q-img src="icons/icon-512x512.png" :ratio="1" style="max-width: 500px; height: 300px;" contain>
           <div class="absolute-bottom text-subtitle1 text-center">
             <q-btn @click="$store.dispatch('smackchat/Login')" no-caps color="green" icon="account_circle" label="Login"></q-btn>
           </div>
         </q-img>
        <!-- <q-tabs
          active-color="primary"
          align="justify"
          class="text-grey"
          dense
          indicator-color="primary"
          narrow-indicator
          v-model="tab">
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-register :tab="tab"/>
          </q-tab-panel>

          <q-tab-panel name="register">
            <login-register :tab="tab"/>
          </q-tab-panel>
        </q-tab-panels> -->
      <!-- </q-card> -->
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: 'login'
    }
  },
  components: {
    // 'login-register' : require('components/LoginRegister.vue').default
  }
}
</script>
