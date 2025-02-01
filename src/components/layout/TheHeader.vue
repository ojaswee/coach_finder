<template>
  <header class="w-full h-20 bg-purple-900 flex items-center">
    <nav class="flex items-center space-x-4 w-full">
      <h1 class="text-white text-2xl mx-auto">
        <router-link to="/" class="no-underline text-pink-300 hover:text-pink-400">Coach Finder</router-link>
      </h1>
      <ul class="flex space-x-4">
        <li><router-link to="/coaches" class="text-pink-300 no-underline px-3 py-2 border border-transparent hover:border-pink-300">Coaches</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/requests" class="text-pink-300 no-underline px-3 py-2 border border-transparent hover:border-pink-300">Requests</router-link></li>
        <li v-else>
          <router-link to="/auth" class="text-pink-300 no-underline px-3 py-2 border border-transparent hover:border-pink-300">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout" class="text-pink-300 no-underline px-3 py-2 border border-transparent hover:border-pink-300">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
  },
}
</script>