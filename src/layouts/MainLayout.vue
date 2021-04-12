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
          {{ $route.name }}
        </q-toolbar-title>

        <q-btn
          dense
          flat
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle"
          label="Login"></q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
}
</script>
