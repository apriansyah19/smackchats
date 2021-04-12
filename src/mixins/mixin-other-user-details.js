export default {
  computed: {
    otherUserDetails() {
      if (this.$store.state.smackchat.users[this.$route.params.otherUserId]) {
        return this.$store.state.smackchat.users[this.$route.params.otherUserId]
      }
      return {}
    }
  }
}