<template>
  <div class="container">
    <div class="container-login">
      <layout />
      <div class="formulario">
        <form action="get">
          <h1>Login</h1>
          <inputEmail />
          <inputPassword />
          <div class="container-botao">
            <p class="registrar">
              <router-link to="/register">Não tenho conta</router-link>
            </p>
            <router-link to="/"><inputSubmit /></router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import layout from "@/components/layout.vue";
import inputEmail from "@/components/form/inputEmail.vue";
import inputPassword from "@/components/form/inputPassword.vue";
import inputSubmit from "@/components/form/inputSubmit.vue";

export default {
  name: "login",
  components: {
    layout,
    inputEmail,
    inputPassword,
    inputSubmit,
  },
};
</script>


<style scoped>
.container-login {
  display: flex;
  justify-content: center;
  margin: 31 auto;
  height: 657px;
}
.container {
  width: 1280px;
  margin: 40px auto;
  height: 100vh;
}

h1 {
  margin-bottom: 30px;
  color: #000e1f;
  font-family: Montserrat;
  font-size: 27px;
  font-style: normal;
  font-weight: 800;
  line-height: 48.6px;
}

.formulario {
  display: flex;
  flex-direction: center;
  align-content: center;
  align-items: center;
  margin: auto;
}
.formulario > form {
  display: flex;
  flex-direction: column;
  width: 535px;
  height: 375px;
  top: 126px;
  left: 684px;
}

.container-botao {
  display: flex;
  justify-content: space-between;
}

.registrar {
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28.8px;
  margin-top: 50px;
}
.registrar a {
  text-decoration: none;
  color: #81858e;
  cursor: pointer;
}
</style>


