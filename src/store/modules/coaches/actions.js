import axios from "axios";

export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.rate,
            areas: data.areas
        };

        try {
            const response = await axios.put('https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/coaches/' + userId + '.json'
                , coachData);

            if (response.status !== 200) {
                throw new Error('Failed to register coach');
            }
            
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
        } catch (error) {
            const errorMessage = new Error(error.response?.data?.message || 'Failed to register coach!');
            console.error('Error registering coach:', errorMessage);
            throw errorMessage;
        }

    },
    async loadCoaches(context,payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        try {
            const response = await axios.get('https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/coaches.json');
            const coaches = response.data;
            const coachesArray = [];
            for (const key in coaches) {
                const coach = {
                    id: key,
                    firstName: coaches[key].firstName,
                    lastName: coaches[key].lastName,
                    description: coaches[key].description,
                    hourlyRate: coaches[key].hourlyRate,
                    areas: coaches[key].areas
                };
                coachesArray.push(coach);
            }
            context.commit('setCoaches', coachesArray);
            context.commit('setFetchTimestamp');
        } catch (error) {
            const errorMessage = new Error(error.response?.data?.message || 'Failed to fetch coach data!');
            console.error('Error loading coaches:', errorMessage);
            throw errorMessage;
        }
    },
}