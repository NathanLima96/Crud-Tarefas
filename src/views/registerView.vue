<template>
  <div class="container">
    <div class="container-register">
      <div class="formulario">
        <form action="post">
          <h1>Increva-se</h1>
          <div>
            <inputName />
            <inputEmail />
            <inputPassword />
          </div>
          <div class="container-botao">
            <p class="registrar">
              <router-link to="/login">Já tenho conta</router-link>
            </p>
            <router-link to="/login"> <input class="button" type="submit" value="Registrar"></router-link>
          </div>
        </form>
      </div>
      <layoutRegister />
    </div>
  </div>
</template>

<script>
import inputEmail from "@/components/form/inputEmail.vue";
import inputPassword from "@/components/form/inputPassword.vue";
import inputSubmit from "@/components/form/inputSubmit.vue";
import inputName from "@/components/form/inputName.vue";
import layoutRegister from "@/components/layoutRegister.vue";

export default {
  name: "register",
  props: {
    teste: String,
  },
  components: {
    layoutRegister,
    inputEmail,
    inputPassword,
    inputSubmit,
    inputName,
  },
};
</script>

<style scoped>

.button{
  width: 171px;
  height: 55px;
  background-color: #000;
  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28.8px;
  margin-top: 48px;
  cursor: pointer;
}
.container-register {
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
  margin: auto;
}
.formulario > form {
  display: flex;
  flex-direction: column;
  padding-left: 70px;
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

