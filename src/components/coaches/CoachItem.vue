<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h4>${{ rate }}/hr</h4>
		<div>
			<span v-for="area in areas" :key="area">
				{{ area }}</span>
		</div>
		<div class="actions">
			<base-button mode="outline" link :to="coachDetails">Details</base-button>
			<base-button link :to="coachContact">Contact</base-button>
		</div>
	</li>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
	components: { BaseButton },
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
<style scoped>
li {
	margin: 1rem 0;
	border: 1px solid #424242;
	border-radius: 12px;
	padding: 1rem;
}

h3 {
	font-size: 1.5rem;
}

h3,
h4 {
	margin: 0.5rem 0;
}

div {
	margin: 0.5rem 0;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>