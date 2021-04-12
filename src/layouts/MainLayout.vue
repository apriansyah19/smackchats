<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          dense
          flat
          icon="arrow_back"
          label="back"></q-btn>
        <q-toolbar-title class="absolute-center">
          {{ $route.name === 'Chat' ?  otherUserDetails.name : $route.name}}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          dense
          flat
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle"
          label="Login"></q-btn>

        <q-btn
          v-else
          dense
          flat
          @click="$store.dispatch('smackchat/logoutUser')"
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle">
          Logout <br>
          {{userDetails.name}}
          </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js';
export default {
  mixins: [mixinOtherUserDetails],
  name: 'MainLayout',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('smackchat', ['userDetails'])
  }
}
</script>


<style lang="stylus">
 .q-toolbar
  .q-btn
   line-height: 1.2
</style>