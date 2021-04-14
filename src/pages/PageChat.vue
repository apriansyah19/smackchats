<template>
  <q-page ref="pageChat" class="flex column page-chat">
    <q-banner v-if="!otherUserDetails.onLine" class="bg-grey-4 text-center fixed-top"> {{otherUserDetails.name}} Is Offline</q-banner>
    <div :class="{'invisible' : !showMessage}" class="q-pa-md column col justify-end">
      <!-- :name="message.from === 'me' ? userDetails.name: otherUserDetails.name" -->
       <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
        :bg-color="message.from === 'me' ? 'light-green-3' : 'white'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input class="full-width" @blur="scrollToButton" ref="newMessage" bg-color="white" dense placeholder="Message" outlined rounded v-model="newMessage">
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
      newMessage: '',
      showMessage: false
    }
  },
  computed: {
    ...mapState('smackchat', ['messages', 'userDetails']),
  },
  methods: {
    ...mapActions('smackchat', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    sendMessage() {
      this.firebaseSendMessage({
        messages: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.otherUserId
      })
      this.clearMessages()
    },
    clearMessages() {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToButton() {
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20);
    }
  },
  watch: {
    messages: function(val) {
      if (Object.keys(val).length) {
        this.scrollToButton()
        setTimeout(() => {
          this.showMessage = true
        }, 200);
      }
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId)
  },
  destroyed() {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style lang="stylus">
.page-chat
  background #e2dfd5
  &:after
    content ''
    display block
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 0
    opacity 0.1
    background-image:
      radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
      radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
      radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
    background-size: 100px 50px;
  .q-banner
    top 50px
    z-index 2
    opacity 0.8
  .q-message
   z-index 2
</style>
