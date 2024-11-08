<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const canAddUser = ref(true);

// Отображение/скрытие полей для детей

const kids = ref([{ name: "", age: null, isVisible: false }]);

const currentBlockIndex = ref(0);

const showNextBlock = () => {
  if (currentBlockIndex.value < kids.value.length) {
    kids.value[currentBlockIndex.value].isVisible = true;
    currentBlockIndex.value++;
  }
};

const deleteKid = (index) => {
  kids.value.splice(index, 1);
  currentBlockIndex.value--;
  if (kids.value.length < 5) {
    canAddUser.value = true;
  }
};

// Сохранение введенных данных

const parent = ref({
  name: "",
  age: "",
});

const submitted = ref(false);

const addKid = () => {
  if (kids.value.length < 5) {
    kids.value.push({ name: "", age: null, isVisible: false });
  }
};

const addShowKid = () => {
  showNextBlock();
  if (kids.value.length >= 5) {
    canAddUser.value = false;
  }
  addKid();
};

// Сохранение в store, чтобы передать на другую страницу

const parentStore = parent.value;
const kidsStore = kids.value;

const goToPreview = () => {
  store.dispatch('updateParent', parentStore);  
  store.dispatch('updateKids', kidsStore); 
  router.push("/preview"); 
};

// Функция на сохранение данных формы

const submitForm = () => {
  submitted.value = true;
  goToPreview();
};
</script>
<template>
  <form @submit.prevent="submitForm" class="account__form">
    <div class="account__parent">
      <h3 class="account__subtitle">Персональные данные</h3>
      <div class="account__field">
        <input
          id="nameParent"
          v-model="parent.name"
          type="text"
          placeholder=" "
        />
        <label for="nameParent">Имя</label>
      </div>
      <div class="account__field">
        <input
          id="ageParent"
          v-model="parent.age"
          type="number"
          placeholder=" "
        />
        <label for="ageParent">Возраст</label>
      </div>
    </div>

    <div class="account__kids">
      <div class="account__top">
        <h3 class="account__subtitle">Дети (макс. 5)</h3>
        <button
          type="button"
          class="btn-outline"
          @click="addShowKid"
          v-if="canAddUser"
        >
          <span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.13332 7.85555C1.50125 7.85555 0.988866 8.36794 0.988867 9C0.988867 9.63206 1.50126 10.1445 2.13332 10.1445L7.85544 10.1445L7.85545 15.8668C7.85545 16.4989 8.36784 17.0113 8.9999 17.0113C9.63196 17.0113 10.1444 16.4989 10.1444 15.8668L10.1443 10.1445L15.8667 10.1445C16.4988 10.1445 17.0112 9.63207 17.0112 9.00001C17.0112 8.36795 16.4988 7.85556 15.8667 7.85556L10.1443 7.85556L10.1443 2.13338C10.1443 1.50132 9.63195 0.988927 8.99989 0.988927C8.36783 0.988927 7.85544 1.50131 7.85544 2.13338L7.85544 7.85555L2.13332 7.85555Z"
                fill="#01A7FD"
              />
            </svg>
          </span>
          <span>Добавить ребенка</span>
        </button>
      </div>

      <div
        v-for="(kid, index) in kids"
        :key="index"
        v-show="kid.isVisible"
        class="account__field-wrap"
      >
        <div class="account__field">
          <input
            :id="'name-' + index"
            v-model="kid.name"
            type="text"
            placeholder=" "
          />
          <label :for="'name-' + index">Имя</label>
        </div>
        <div class="account__field">
          <input
            :id="'age-' + index"
            v-model="kid.age"
            type="number"
            placeholder=" "
          />
          <label :for="'age-' + index">Возраст</label>
        </div>
        <div class="link account__delete-btn" @click="deleteKid(index)">
          Удалить
        </div>
      </div>
    </div>
    <div>
      <button type="submit" class="btn">Сохранить</button>
    </div>
  </form>
</template>
<style scoped>
.account__form {
  margin: 30px auto 20px;
  max-width: 616px;
  width: 100%;
}
.account__subtitle {
  font-size: 16px;
  font-weight: 500;
}
.account__parent {
  margin-bottom: 35px;
}
.account__parent .account__subtitle {
  margin-bottom: 20px;
}

.account__field-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 60px;
  align-items: center;
  gap: 18px;
}
.account__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-self: center;
}
.account__field {
  position: relative;
  margin-bottom: 10px;
}
.account__field:last-of-type {
  margin-bottom: 0;
}
.account__field input {
  width: 100%;
  height: 56px;
  padding: 10px 14px;
  padding-top: 30px;
  font-size: 16px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  outline: none;
  transition: padding-top 0.3s ease;
}
.account__field input::placeholder {
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  color: rgba(17, 17, 17, 0.48);
}
.account__field label {
  position: absolute;
  top: 8px;
  left: 16px;
  z-index: 6;
  font-size: 13px;
  color: rgba(17, 17, 17, 0.48);
  pointer-events: none;
  transition: all 0.3s ease;
}
.account__kids {
  margin-bottom: 23px;
  display: flex;
  flex-direction: column;
}
.account__kids .account__subtitle {
  line-height: 43px;
}
.account__kids .account__top {
  margin-bottom: 10px;
}
.preview .account__subtitle {
  margin-bottom: 20px;
}
.preview p {
  margin-bottom: 57px;
  font-weight: 700;
}
.preview ul {
  list-style: none;
}
.preview li {
  padding: 10px 20px;
  margin-bottom: 20px;
  width: fit-content;
  background-color: #f1f1f1;
  border-radius: 4px;
  font-weight: 700;
}
</style>
