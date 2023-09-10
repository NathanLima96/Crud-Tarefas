<template>
  <div class="container">
    <div class="container-text">
      <img class="emote" src="/img/icone.png" alt="">
      <div class="text">
        <p class="titulo">A fortuna fica ao lado daquele que ousa.</p>
        <p class="paragrafo">Todo progresso ocorre fora da zona de conforto.</p>
      </div>
      <img :src="src" :alt="alt">
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutRegister',
  data() {
    return {
      src: '/img/Group5.png',
      alt: 'Image white',
    }
  }
}
</script>


<style scoped>


.container{
  margin:  auto;
  height: 657px;    
  background-color:#FFF;
}

.container-text{
  width: 609px;
  height: 599px;
  background-color:#F7F7F7; 
  margin: 31px 31px 27px 31px;
}


.text{
  margin-left: 45px;
}

.titulo{
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; 
  width: 513px;
  margin-bottom: 15px;
}


.paragrafo{
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding-bottom: 93px;
}

.emote{
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 152px;
  padding: 60px 0px 0px 50px;
}

img{
  margin-left: 45px;
}

</style>