import axios from 'axios';

const API_KEY = 'AIzaSyBlTm7a7-vIsFvtIyvcnLkKgH2sXkbgOF0';

export default {
  async login(context, payload) {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      });

      const responseData = response.data;

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    } catch (error) {
      const errorMessage = new Error(error.response?.data?.error?.message || 'Failed to authenticate. Check your login data.');
      console.error('Error logging in:', errorMessage);
      throw errorMessage;
    }
  },
  async signup(context, payload) {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      });

      const responseData = response.data;

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    } catch (error) {
      const errorMessage = new Error(error.response?.data?.error?.message || 'Failed to authenticate. Check your signup data.');
      console.error('Error signing up:', errorMessage);
      throw errorMessage;
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
