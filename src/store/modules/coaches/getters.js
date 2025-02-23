export default {
	coaches(state) {
		return state.coaches;
	},
	hasCoaches(state) {
		return state.coaches && state.coaches.length > 0;
	},
	findCoachById: (state) => (id) => {
		return state.coaches.find(coach => coach.id === id);
	},
	getCoachAreas(state) {
		const areas = new Set();
		state.coaches.forEach(coach => {
			coach.areas.forEach(area => areas.add(area));
		});
		if (areas.size <= 0) {
			return ['Frontend', 'Backend', 'Devops'];
		}
		return Array.from(areas);
	},

	isCoach(state, getters, rootState) {
		const coaches = getters.coaches;
		const userId = rootState.auth.userId;
		return coaches.some(coach => coach.id === userId);
	},
	shouldUpdate(state) {
		const lastFetch = state.lastFetch;
		if (!lastFetch) {
			return true;
		}
		const currentTimeStamp = new Date().getTime();
		return (currentTimeStamp - lastFetch) / 1000 > 120;
	}
};