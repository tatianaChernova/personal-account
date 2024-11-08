<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <div class="logo">
          <img src="/images/logo-main.png" alt="Логотип Alef Development" />
        </div>
        <nav>
          <RouterLink to="/">Форма</RouterLink>
          <RouterLink to="/preview">Превью</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
  <footer class="footer">
    <div class="footer__wrap">all rights reserved</div>
  </footer>
</template>

<style scoped>
.header {
  box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);
}
.header__wrap {
  height: 76px;
  display: grid;
  grid-template-columns: 175px 1fr 100px;
  align-items: center;
}
.logo {
  display: flex;
  justify-content: center;
  align-self: center;
}
nav {
  display: flex;
  justify-content: center;
  align-self: center;
  gap: 24px;
}
nav a {
  color: rgba(17, 17, 17, 0.48);
  text-decoration: none;
  font-size: 14px;
}
main {
  padding-bottom: 76px;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
}
.footer__wrap {
  width: 100%;
  margin: auto;
  height: 76px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 400;
}
</style>
