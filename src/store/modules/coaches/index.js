import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default
	{
		namespaced: true,
		state() {
			return {
				coaches: [
					{
						id: 'c1',
						firstName: 'Ojaswee',
						lastName: 'Dhungana',
						areas: ['Frontend', 'Backend', 'Devops'],
						description:
							"With 6 years in software development and a degree in Computer Science, I'll help you get your first job or grow in your current role.",

						hourlyRate: 30
					},
					{
						id: 'c2',
						firstName: 'Julie',
						lastName: 'Jones',
						areas: ['Frontend', 'Devops'],
						description:
							'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
						hourlyRate: 30
					}
				]
			}
		},
		mutations,
		actions,
		getters
	};