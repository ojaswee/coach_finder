export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
		console.log('setUser', payload);
		state.tokenExpiration = payload.tokenExpiration;
	}
};