<template>
  <div class="row justify-center q-my-xl">
    <div class="col-12 col-md-auto">
      <h3>ورود به حساب کاربری</h3>

      <div class="q-pa-md ">
        <q-form align="right" @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="userName"
            label="نام کاربری (شماره موبایل) *"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="password"
            label="رمز عبور (کد ملی) *"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
              // val => val > 0 && val < 100 || 'Please type a real age'
            ]"
          />

          <div>
            <q-btn label="ورود" type="submit" color="purple" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';
import { computed } from 'vue';
import { useAuthenticationStore } from '../stores/authentication';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'loginPage',
  components: {},
  setup() {
    const router = useRouter();

    const userAuth = useAuthenticationStore();
    const $q = useQuasar();
    const userName = ref('');
    const password = ref('');
    // const counter = user.count;
    const userInfo = computed(() => userAuth.userInfo);

    const hasError = computed(() => userAuth.hasError);

    // const userInfo = user.userInfo;

    return {
      userInfo,
      userName,
      hasError,
      password,
      async onSubmit() {
        const userPasss = {
          mobile: userName.value,
          password: password.value,
        };
        var res = await userAuth.loadUser(userPasss);

        if (hasError.value == true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `شماره موبایل باید 11 رقم باشد,
             \n   کد ملی باید 10 رقم باشد`,
          });
        } else {
          $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'success',
            message: 'با موفقیت وارد شدید',
          });
          router.push({ path: '/profile' });
        }
      },
    };
  },
});
</script>
