import axios from "axios";

export default {
	async contactCoach(context, payload) {
		const newRequest = {
			userEmail: payload.email,
			message: payload.message
		};
		//get global axios
		console.log(payload.coachId);
		const response = await axios.post(`https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
			newRequest
		);

		const responseData = response.data;

		if (!response.ok) {
			const error = new Error(responseData.message
				|| 'Failed to send request to coach.');
			throw error;
		}

		newRequest.id = responseData.name;
		newRequest.coachId = payload.coachId;
		context.commit('addRequest', newRequest);
	},
	async fetchRequests(context) {
		const coachId = context.rootGetters.userId;
		const token = context.rootGetters.token;
		try {
			const response = await axios.get(`https://vue-http-demo-4ba90-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +token);
			const responseData = response.data;
			const requests = [];

			for (const key in responseData) {
				const request = {
					id: key,
					coachId: coachId,
					userEmail: responseData[key].userEmail,
					message: responseData[key].message
				};
				requests.push(request);
			}
			context.commit('setRequests', requests);
		} catch (error) {
			const errorMessage = error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: 'Failed to fetch requests.';
			throw new Error(errorMessage);
		}
	}
}