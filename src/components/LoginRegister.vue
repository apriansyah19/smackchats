<template>
  <q-form class="q-gutter-md" @submit="submitForm">
      <q-input v-if="tab === 'register'" outlined label="Name" v-model="formData.name"></q-input>
      <q-input outlined type="email" label="Email" v-model="formData.email"></q-input>
      <q-input outlined type="password" label="Password" v-model="formData.password"></q-input>
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" :label="tab"></q-btn>
      </div>
  </q-form>
</template>

<script>
export default {
props: ["tab"],
 data() {
     return {
         formData: {
             name: '',
             email: '',
             password: ''
         }
     }
 },
 methods: {
     submitForm() {
         if (this.tab === 'login') {
             this.$store.dispatch('smackchat/loginUser', this.formData)
         } else {
             this.$store.dispatch('smackchat/registerUser', this.formData)
         }
     }
 }
}
</script>

<style>

</style>