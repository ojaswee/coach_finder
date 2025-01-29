export default {
	addRequest(state, payload) {
		state.requests.push(payload);
	},
	setRequests(state, requests) {
		state.requests = requests;
	},
}