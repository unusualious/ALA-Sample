import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// import apiAuth from 'boot/axios';
import axios from 'axios';

export const useAuthenticationStore = defineStore('authentication', () => {
  const hasError = ref(false);
  const authToken = ref('');
  const userInfo = ref([]);
  const loadUser = async (userPass) => {
    try {
      debugger;
      const res = await axios
        .post('https://alaatv.com/api/v2/login', userPass)
        .then(
          (res) => {
            debugger;
            hasError.value = false;
            userInfo.value = res.data.data.user;
            localStorage.setItem('ProfileInfo', JSON.stringify(res.data.data.user));
            localStorage.setItem('token', JSON.stringify(res.data.data.access_token));
            authToken.value = res.data.data.access_token;
            return res;
          },
          (error) => {
            debugger;
            hasError.value = true;
            userInfo.value = error.response.data.errors;
            console.log(error);
          }
        );
    } catch (e) {
      console.log('Failed to load data');
    }
  };

  return { loadUser, userInfo, hasError, authToken };
});
