<template>
  <div>
    <label for="password" >Senha de acesso</label>
    <input type="password" name="password" id="password" placeholder="********">
  </div>
</template>

<script>

export default {
  name: 'inputPassword',
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
  width: 535px;
  height: 55px;
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

