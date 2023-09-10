<template>
  <div>
    <label for="text" >Nome Completo</label>
    <input type="text" name="name" id="name" placeholder="Escreva seu nome">
  </div>
</template>

<script>

export default {
  name: 'inputName',
}
</script>

<style scoped>
label{
  font-size: 16px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
}

input{
  border: 1px solid #E5E5E5EE;
  width: 530px;
  height: 55px;
  margin-bottom: 20px;
}

input::placeholder{
  padding: 20px;
  color: #8C8A97;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28.8px; 
  margin: 0 auto;
}

</style>

