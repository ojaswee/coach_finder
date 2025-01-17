import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

import CoachesDetail from './pages/coaches/CoachesDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/coaches' },
		{ path: '/coaches', component: CoachesList },
		{
			path: '/coaches/:id', component: CoachesDetail, 
			children:
				[{ path: 'contact', component: ContactCoach }]
		},
	{ path: '/register', component: CoachesRegistration },
	{ path: '/requests', component: RequestsReceived },
	{ path: '/:notFound(.*)', component: NotFound },
	],
});

export default router;

