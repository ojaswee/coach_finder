<template>
	<the-header></the-header>
	<router-view v-slot="slotProps" mode="out-in">
		<transition name="route">
			<component :is="slotProps.Component"></component>
		</transition>
	</router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
	components: {
		TheHeader
	},
	computed: {
		didAutoLogout() {
			return this.$store.getters.didAutoLogout;
		}
	},
	created() {
		this.$store.dispatch('autoLogin');
	},
	watch: {
		didAutoLogout(currentValue, previousValue) {
			if (currentValue && currentValue !== previousValue) {
				this.$router.replace('/coaches');
			}
		}
	}
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
	box-sizing: border-box;
}

html {
	font-family: "Roboto", sans-serif;
}

body {
	margin: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}

.route-enter,
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>