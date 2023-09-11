<template>
  <div>
    <div class="criar-tarefa d-flex gap-2">
      <img
        class="imagem-criar"
        src="/img/svgs/Vectorcriarbranco.svg"
        alt="criar-tarefa"
      />
      <button @click="$bvModal.show('my-modal')" class="btn-criar-tarefa">
        Criar Tarefa
      </button>
    </div>
    <b-modal
      hide-backdrop
      centered
      title="BootstrapVue"
      size="lg"
      ref="my-modal"
      id="my-modal"
      hide-footer
      hide-header
    >
      <form ref="form" @submit.prevent="criarTarefa($event)">
        <b-form-input
          v-if="!preview"
          id="name-input"
          v-model="titulo"
          placeholder="Nome da Tarefa"
          required
        ></b-form-input>
        <p v-else id="name">{{ titulo }}</p>
        <b-form-input
          v-if="!preview"
          id="description-input"
          v-model="description"
          placeholder="Descrição"
          required
        ></b-form-input>
        <p v-else id="description">{{ description }}</p>
        <span class="d-flex">
          <img class="imagem-data" src="/img/svgs/Vectordata.svg" alt="data" />
          <b-form-input
            v-if="!preview"
            id="data-input"
            v-model="data_vencimento"
            placeholder="Data de Vencimento"
            type="date"
            required
          ></b-form-input>
          <p class="data-preenchida" v-else>{{ data_vencimento }}</p>
        </span>
        <div class="button d-flex gap-3">
          <b-button class="btn-cancelar" @click="hideModal">Cancelar</b-button>
          <b-button v-if="!preview" class="btn_criar" @click.prevent="criar"
            >Criar Tarefa</b-button
          >
          <b-button v-else class="btn_criar" type="submit" @click="hideModal"
            >Criar Tarefa</b-button
          >
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "mymodal",
  data() {
    return {
      titulo: "",
      description: "",
      data_vencimento: "",
      status: "pendente",
      preview: false,
    };
  },

  methods: {
    async criarTarefa(e) {
      e.preventDefault();

      const dados = {
        titulo: this.titulo,
        description: this.description,
        data_vencimento: this.data_vencimento,
        status: "pendente",
      };
      const dadosJson = JSON.stringify(dados);

      console.log(dadosJson);

      const req = await fetch("http://localhost:8000/tarefa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      const res = await req.json();

      window.location.reload();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      window.location.reload();
    },
    criar() {
      this.preview = true;
    },
  },
};
</script>

<style scoped>
.criar-tarefa {
  display: flex;
  gap: 10px;
  border: 1px solid #e5e5e5;
  min-width: 678px;
  padding: 20px;
}
#data-input {
  width: 200px;
  height: 40px;
  text-align: center;
}
#name {
  width: 150px;
  padding: 15px 0px;
}
#descricao {
  padding: 10px 0px;
}

::placeholder {
  color: #81858e;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}

.data-preenchida {
  text-align: center;
  align-items: center;
  margin: 0px auto;
}

textarea:focus,
input:focus {
  box-shadow: 0 0 0 0;
  outline: 0;
}

.button {
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: end;
  padding-top: 10px;
}

span {
  display: flex;
  padding: 10px;
  border: 1px solid #e5e5e5;
  text-align: center;
  align-items: center;
  width: 235px;
}

input {
  border: none;
}

.btn_criar {
  width: 122px;
  height: 40px;
  background: #000;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.btn_criar:hover {
  width: 122px;
  height: 40px;
  background: #000;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.btn-cancelar {
  width: 102px;
  height: 40px;
  background: #f7f7f7;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.btn-cancelar:hover {
  width: 102px;
  height: 40px;
  background: #f7f7f7;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.btn-criar-tarefa {
  color: #81858e;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: auto 0px;
  background: none;
  border: none;
}
.btn-criar-tarefa:hover {
  color: #81858e;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: auto 0px;
  background: none;
  border: none;
}
</style>
