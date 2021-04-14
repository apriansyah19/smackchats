<template>
  <q-page class="flex q-pa-sm">
    <q-list
      separator
      class="full-width">
      <q-item
        :key="key"
        clickable
        :to="'/chat/' + key"
        v-for="(user, key) in users"
        v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.onLine ? 'light-green-6' : 'red-6'">
            {{user.onLine ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      dataTemp: ''
    }
  },
  computed: {
    ...mapGetters('smackchat', ['users'])
  }
}
</script>
