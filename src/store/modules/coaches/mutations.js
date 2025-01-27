export default {
	registerCoach(state, payload) {
		state.coaches.push(payload);
	},
	setCoaches(state, coaches) {
		state.coaches = coaches;
	}
};