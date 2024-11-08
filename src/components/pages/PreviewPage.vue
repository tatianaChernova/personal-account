<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const parentStore = computed(() => store.getters.getParent);
const kidsStore = computed(() => store.getters.getKids);

</script>
<template>
  <div class="preview">
    <div class="preview__item" v-if="parentStore.name">
      <h3 class="account__subtitle">Персональные данные</h3>
      <p>{{ parentStore.name }}, {{ parentStore.age }} лет</p>
    </div>
    <div class="preview__item" v-if="kidsStore[0].name">
      <h3 class="account__subtitle">Дети</h3>
      <ul>
        <li
          v-for="(kid, index) in kidsStore"
          :key="index"
          v-show="kid.isVisible"
        >
          {{ kid.name }}, {{ kid.age }} лет
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.account__subtitle {
  font-size: 16px;
  font-weight: 500;
}
.preview {
  margin: 30px auto 20px;
  max-width: 616px;
  width: 100%;
}
.preview .account__subtitle {
  margin-bottom: 20px;
}
.preview__item {
  margin-bottom: 60px;
}
.preview__item:last-of-type {
  margin-bottom: 0;
}
.preview p {
  font-size: 16px;
  font-weight: 700;
}
.preview ul {
  list-style: none;
  padding: 0;
}
.preview li {
  padding: 10px 20px;
  margin-bottom: 20px;
  width: fit-content;
  background-color: #f1f1f1;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
}
</style>
