<template>
  <q-page class="flex column">
    <q-banner v-if="!otherUserDetails.onLine" class="bg-grey-4 text-center"> {{otherUserDetails.name}} Is Offline</q-banner>
    <div class="q-pa-md column col justify-end">
       <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from === 'me' ? userDetails.name: otherUserDetails.name"
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
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js';
import { mapActions, mapState } from 'vuex';
export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: ''
    }
  },
  computed: {
    ...mapState('smackchat', ['messages', 'userDetails']),
  },
  methods: {
    ...mapActions('smackchat', ['firebaseGetMessages', 'firebaseStopGettinhMessages']),
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      })
      this.newMessage = ''
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId)
  },
  destroyed() {
    this.firebaseStopGettinhMessages()
  }
}
</script>
