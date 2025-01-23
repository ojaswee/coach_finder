// to do: fetch coaches from the server

import axios from 'axios';

export default {
	async fetchCoaches({ commit }) {
        try {
            const response = await axios.get('https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/coachFinder.json');
            const coaches = response.data;
            commit('coaches', coaches);
        } catch (error) {
            console.error('Error fetching coaches:', error);
        }
    }
};