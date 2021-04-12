<template>
  <q-page class="flex q-pa-sm">
      <q-card class="full-width">
        <q-tabs
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
        </q-tab-panels>
      </q-card>
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
    'login-register' : require('components/LoginRegister.vue').default
  }
}
</script>
