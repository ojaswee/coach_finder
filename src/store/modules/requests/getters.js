export default {
	hasRequests(_, getters) {
		return getters.requests && getters.requests.length > 0;
	},
	requests(state) {
		return state.requests;
	},
}