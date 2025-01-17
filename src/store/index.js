import { createStore } from 'vuex';

import coachesModules from './modules/coaches/index.js';
import requestsModules from './modules/requests/index.js'; 

// Create a new store instance.
const store = createStore({
    modules: {
        coaches: coachesModules,
        requests: requestsModules
    }
});

export default store;