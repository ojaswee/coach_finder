<template>
	<section>
		<base-card>
			<h2> {{ fullname }}</h2>
			<h3>${{ rate }}/hr</h3>
		</base-card>
	</section>
	<section>
		<base-card>
			<h3>{{ description }}</h3>
		</base-card>
	</section>
	<section>
		<base-card>
			<h2>Areas of expertise</h2>
			<div>
				<base-badge v-for="area in areas" :key="area" :type="area" :title="area" :class="area">
				</base-badge>
			</div>
		</base-card>
	</section>
	<section>
		<base-card>
			<h2>Interested ? Contact now! </h2>
			<base-button link :to="contactLink">Contact </base-button>
			<router-view></router-view> 
			<!-- <router-link :to="contactLink">Contact Coach</router-link>
			<router-view></router-view> -->
		</base-card>
	</section>
</template>

<script>
export default {
	props: ['id'],
	data() {
		return {
			selectedCoach: null
		};
	},
	computed: {
		fullname() {
			return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
		},
		rate() {
			return this.selectedCoach.hourlyRate;
		},
		description() {
			return this.selectedCoach.description;
		},
		areas() {
			return this.selectedCoach.areas;
		},
		contact() {
			return this.selectedCoach.contact;
		},
		contactLink() {
			return `/coaches/${this.id}/contact`;
		}
	},
	created() {
		this.selectedCoach = this.$store.getters['coaches/findCoachById'](this.id);
	}
}

</script>