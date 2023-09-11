<template>
  <div>
    <b-modal
      hide-backdrop
      centered
      title="BootstrapVue"
      size="lg"
      ref="sub-modal"
      id="sub-modal"
      hide-footer
      hide-header
    >
      <form ref="form" @submit.prevent="criarSubTarefa($event)">
        <b-form-input
          v-if="!preview"
          id="description-input"
          v-model="description"
          placeholder="Descrição"
          required
        ></b-form-input>
        <p v-else id="description">{{ description }}</p>
        <div class="button d-flex gap-3">
          <b-button class="btn-cancelar" @click="hideModal">Cancelar</b-button>
          <b-button v-if="!preview" class="btn_criar" @click.prevent="criar">Criar SubTarefa</b-button
          >
          <b-button v-else class="btn_criar" type="submit" @click="hideModal"
            >Criar SubTarefa</b-button
          >
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "sub-modal",
  data() {
    return {
      description: "",
      status: "pendente",
      preview: false,
    };
  },
  props: {
    tasks: Object
  },
  methods: {
    async criarSubTarefa(e) {
      e.preventDefault();
      const dados = {
        id_tarefa: this.tasks.id,
        description: this.description,
        status: "pendente",
      };
      const dadosJson = JSON.stringify(dados);

      console.log(dadosJson);

      const req = await fetch(`http://localhost:8000/subtarefa/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      const res = await req.json();

      window.location.reload();
    },


    showModal() {
      this.$refs["sub-modal"].show();
    },
    hideModal() {
      this.$refs["sub-modal"].hide();
      window.location.reload();
    },
    criar() {
      this.preview = true;
    },
  },
};
</script>

<style scoped>
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
  width: 150px;
  height: 40px;
  background: #000;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.btn_criar:hover {
  width: 150px;
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
