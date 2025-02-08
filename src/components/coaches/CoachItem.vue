<template>
	<li class="my-4 border border-gray-700 rounded-lg p-4">
		<h3>{{ fullName }}</h3>
		<h4 class="text-lg mb-2">${{ rate }}/hr</h4>
		<div>
			<base-badge v-for="area in areas"
				:key="area"
				:type="area"
				:title="area"
				:class="area">
			</base-badge>
		</div>
		<div class="actions flex justify-end mt-2">
			<base-button :link="true" mode="outline" :to="coachDetails">Details</base-button> 
			<base-button :link="true" :to="coachContact">Contact</base-button> 
		</div>
	</li>
</template>

<script>
export default {
	props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
	computed: {
		fullName() {
			return this.firstName + ' ' + this.lastName;
		},
		coachContact() {
			return this.$route.path + '/' + this.id + '/contact';
		},
		coachDetails() {
			return this.$route.path + '/' + this.id;
		},
	},
};
</script>