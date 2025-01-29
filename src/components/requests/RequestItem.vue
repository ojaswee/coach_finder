<template>
	<li>
		<div>
			<h3>{{ email }}</h3>
		</div>
		<p>{{ message }}</p>
		<base-button :href="emailLink">Contact</base-button>
	</li>
</template>
<script>
export default {
	props: ['email', 'message'],
	computed: {
		emailLink() {
			return `mailto:${this.email}`;
		}
	}
}
</script>
<style>
li {
	margin: 1rem 0;
	border: 1px solid #ccc;
	padding: 1rem;
}

</style>
