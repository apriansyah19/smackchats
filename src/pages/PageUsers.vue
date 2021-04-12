<template>
  <q-page class="flex q-pa-sm">
    <q-list
      separator
      class="full-width">
      <q-item
        :key="user.id"
        clickable
        to="/chat"
        v-for="user in users"
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
          <q-badge :color="user.online ? 'light-green-6' : 'red-6'">
            {{user.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>


export default {
    data () {
    return {
      users: [{
        id: 1,
        name: 'Boboy',
        online: true
      }, {
        id: 2,
        name: 'Yayan',
        online: false
      }, {
        id: 3,
        name: 'Toto',
        online: true      }]
    }
  }
}
</script>
