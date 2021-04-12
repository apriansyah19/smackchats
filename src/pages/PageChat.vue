<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center"> User Is Offline</q-banner>
    <div class="q-pa-md column col justify-end">
       <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
      />

    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input class="full-width" bg-color="white" dense placeholder="Message" outlined rounded v-model="newMessage">
            <template v-slot:after>
              <q-btn @click="sendMessage" type="submit" color="white" dense flat icon="send" round />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [
        {
          text: 'Hii',
          from: 'me'
        },
        {
          text: 'Haloo Bro',
          from: 'then'
        },
        {
          text: 'Ntot Yuk',
          from: 'me'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
      this.newMessage = ''
    }
  }
}
</script>
