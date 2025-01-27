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
		if (areas.size === 0) {
			return ['Frontend', 'Backend', 'Devops'];
		}
        return Array.from(areas);
	},

	isCoach(_, getters, rootGetters) {
		const coaches = getters.coaches;
		const userId = rootGetters.userId;
		return coaches.some(coach => coach.id === userId);

	}
};