import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useFormDataStore = defineStore('formData', () => {
  const cities = ref([]);
  const provinces = ref([]);
  const gender = ref([]);
  const userFormData = async () => {
    try {
      debugger;
      const res = await axios
        .get('https://alaatv.com/api/v2/megaroute/getUserFormData')
        .then(
          (res) => {
            debugger;
            cities.value = res.data.data.cities;
            return res;
          },
          (error) => {
            debugger;
            console.log(error);
          }
        );
    } catch (e) {
      console.log('Failed to load data');
    }
  };
  userFormData();
  return { userFormData, cities, provinces, gender };
});
