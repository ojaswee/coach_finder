<template>
	<section>
		Search
	</section>
	<section>
		<div class="controls">
			<button>Refresh</button>
			<router-link to="/register">Register as coach</router-link>
		</div>
		<ul v-if="hasCoaches" >
			<li v-for="coach in filteredCoaches" :key="coach.id">
				<h3>{{ coach.firstName }}</h3>
				<p>{{ coach.description }}</p>
			</li>
		</ul>
		<p v-else>No coaches found</p>
	</section>
</template>
<script>

export default {
	computed: {
		filteredCoaches() {
			return this.$store.getters['coaches/coaches'];
		},
		hasCoaches() {
			return this.$store.getters['coaches/hasCoaches'];
		},
	},
}
</script>
