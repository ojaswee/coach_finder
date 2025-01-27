export default {
	hasRequests(_, getters) {
		return getters.requests && getters.requests.length > 0;
	},
	requests(state, _, _2, rootGetters) {
		const coachId = rootGetters.userId;
		return state.requests.filter(req => req.coachId === coachId);
	}
}