<template>
  <div class="row justify-center q-my-xl">
    <div class="col-12 col-md-auto" align="right">
      <div class="row items-end q-my-md">
        <div class="col">
          <h5>کاربر گرامی، خوش آمدید. لطفا اطلاعات خود را تکمیل نمایید</h5>
          <q-badge outline color="orange" :label="userInfo.wallet_balance" />
          : اعتبار کیف پول شما
        </div>
        <div class="col-2">
          <q-avatar>
            <q-img
              :src="userInfo.photo"
              spinner-color="white"
              style="height: 50px; max-width: 50px"
            />
          </q-avatar>
        </div>
      </div>
      <div class="q-pa-md">
        <q-form @submit="onSubmit" align="right" class="row" v-if="editMode">
          <div class="col-4 q-pa-lg">
            <q-input
              filled
              v-model="first_name"
              label="لطفا نام خود را وارد نمایید*"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
          <div class="col-4 q-pa-lg">
            <q-input
              filled
              v-model="last_name"
              label="لطفا نام خانوادگی را وارد نمایید *"
              lazy-rules
            />
          </div>
          <div class="col-4 q-pa-lg">
            <q-input
              filled
              type="email"
              v-model="email"
              label="لطفا ایمیل را وارد نمایید *"
              lazy-rules
            />
          </div>
          <div class="col-4 q-pa-lg">
            <q-radio dense v-model="gender" val="مرد" label="مرد" />
            <q-radio dense v-model="gender" val="زن" label="زن" />
          </div>
          <div class="col-4 q-pa-lg">
            <q-select
              v-model="city"
              :options="citiesNameArray"
              label="انتخاب شهر"
            />
          </div>
          <div class="col-12">
            <q-btn label="ثبت اطلاعات کاربر" type="submit" color="purple" />
          </div>
        </q-form>

        <div v-else>
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card col-12" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col-12">
                  <div class="text-h5 q-mt-sm q-mb-xs q-mb-lg">
                    اطلاعات کاربر
                  </div>
                  <div
                    class="text-subtitle1 q-py-md"
                    v-if="userInfo.first_name"
                  >
                    <span>
                      {{ userInfo.first_name }}
                    </span>
                    : نام
                  </div>
                  <q-separator />
                  <div class="text-subtitle1 q-py-md">
                    <span>
                      {{ userInfo.last_name }}
                    </span>
                    <span> : نام خانوادگی </span>
                  </div>
                  <q-separator />
                  <div class="text-subtitle1 rtl-direction q-py-md">
                    <span> جنسیت :</span>
                    <span>
                      {{ userInfo.gender }}
                    </span>
                  </div>
                  <q-separator />
                  <div class="text-subtitle1 rtl-direction q-py-md">
                    <span> نام شهر : </span>
                    <span>
                      {{ userInfo.cities }}
                    </span>
                  </div>
                </q-card-section>
              </q-card-section>

              <q-card-actions>
                <q-btn
                  label="تکمیل اطلاعات کاربر"
                  color="primary"
                  @click="switchEditMode"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { computed } from 'vue';
import { useFormDataStore } from '../stores/formData';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'profilePage',
  setup() {
    const formData = useFormDataStore();
    const router = useRouter();

    onMounted(() => {
      var token = localStorage.getItem('token');

      if (!token) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message:
            'شما دسترسی به این بخش ندارید، لطفا ابتدا وارد حساب کاربری شوید',
        });
        setTimeout(() => {
          router.push({ path: '/' });
        }, 2000);
      }
    });
    const first_name = ref('');
    const last_name = ref('');
    const email = ref('');
    const gender = ref('مرد');
    const city = ref('');
    const editMode = ref(false);
    const switchEditMode = () => {
      editMode.value = true;
    };
    // const userInfo = computed(() => localStorage.getItem('ProfileInfo'));
    const userInfo = computed(() =>
      JSON.parse(localStorage.getItem('ProfileInfo').toString())
    );
    const cities = computed(() => formData.cities);
    const citiesNameArray = computed(() => {
      var citiesArray = [];
      for (var i = 0; i < cities.value.length; i++) {
        citiesArray.push(cities.value[i].title);
      }
      return citiesArray;
    });
    console.log(cities);
    return {
      userInfo,
      cities,
      citiesNameArray,
      editMode,
      switchEditMode,
      first_name,
      last_name,
      email,
      gender,
      city,
      onSubmit() {
        debugger;
        userInfo.value.first_name = first_name.value;
        userInfo.value.last_name = last_name.value;
        userInfo.value.email = email.value;
        userInfo.value.gender = gender.value;
        userInfo.value.cities = city.value;
        localStorage.setItem('ProfileInfo', JSON.stringify(userInfo.value));
        editMode.value = false;
      },
    };
  },
});
</script>
<style lang="sass">
.example-row-column-width
  .row > div
    padding: 10px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
  .row + .row
    margin-top: 1rem
</style>
