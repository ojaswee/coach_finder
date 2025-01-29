<template>
	<div>
		<base-dialog :show="!!error" title="Error" @close="error = null">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header>
					<h2>
						Requests Received
					</h2>
				</header>
				<div v-if="isLoading"><base-spinner></base-spinner></div>
				<ul v-else-if="!isLoading && hasRequests">
					<request-item v-for="request in requestsReceived" :key="request.id" :email="request.userEmail"
						:message="request.message"></request-item>
				</ul>
				<div v-else-if="!isLoading && !hasRequests">
					<h3>No new request received.</h3>
				</div>
			</base-card>
		</section>
	</div>
</template>
<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
	components: {
		RequestItem,
	},
	data() {
		return {
			isLoading: true,
			error: null
		};
	},
	computed: {
		requestsReceived() {
			return this.$store.getters['requests/requests'];
		},
		hasRequests() {
			return this.$store.getters['requests/hasRequests'];
		}
	},
	methods: {
		async fetchRequests() {
			this.isLoading = true;
			this.error = null;
			try {
				await this.$store.dispatch('requests/fetchRequests');
			} catch (error) {
				this.error = error.message;
			} finally {
				this.isLoading = false;
			}
		}
	},
	created() {
		this.fetchRequests();
	}
}
</script>

<style scoped>
header {
	text-align: center;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>