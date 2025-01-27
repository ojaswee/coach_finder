import axios from "axios";

export default {
    fetchFirebase() {
        return 'https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/coaches';
    },
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

        const response = await axios.put('https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/coaches/' + userId + '.json'
            , coachData);

        // const responseData = await response.json();
        if (!response.ok) {
            new Error('Failed to register coach');
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches({ commit }) {
        try {
            const response = await axios.get('https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/coaches.json');
            // const firebaselink = this.fetchFirebase + '.json';
            // console.log(firebaselink);
            // const response =await axios.get(firebaselink);
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
            commit('setCoaches', coachesArray);
        } catch (error) {
            console.error('Error loading coaches:', error);
        }
    },
}