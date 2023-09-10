<template>
  <div>
    <div class="criar-tarefa">
      <img
        class="imagem-criar"
        src="/img/svgs/Vectorcriarbranco.svg"
        alt="criar-tarefa"
      />
      <button @click="abrirModal" class="titulo-criar-tarefa">
        Criar Tarefa
      </button>
    </div>
    <dialog id="modal" class="modal">
      <form class="teste" @submit.prevent="criarTarefa($event)">
        <div class="conteudo">
          <input
            type="text"
            name="name"
            id="name"
            v-model="titulo"
            placeholder="Nome da Tarefa"
          />
          <input
            type="text"
            name="descricao"
            id="descricao"
            v-model="description"
            placeholder="Descrição"
          />
          <span class="tarefa-data">
            <img
              class="imagem-data"
              src="/img/svgs/Vectordata.svg"
              alt="data"
            />
            <input
              type="text"
              name="data"
              id="data"
              v-model="data_vencimento"
              placeholder=" Data de Vencimento"
            />
          </span>
        </div>
        <div class="button">
          <input
            class="btn-cancelar"
            type="button"
            value="Cancelar"
            @click="fecharModal"
          />
          <input
            class="btn_criar"
            type="submit"
            id="teste"
            value="Criar Tarefa"
          />
        </div>
      </form>
    </dialog>
    <div id="modal-preenchido" class="modal">
      <form class="teste" @submit.prevent="criarTarefa($event)">
        <div class="conteudo">
          <p id="name">{{ titulo }}</p>
          <p id="description">{{ description }}</p>
          <span class="tarefa-data">
            <img
              class="imagem-data"
              src="/img/svgs/Vectordata.svg"
              alt="data"
            />
            {{ data_vencimento }}
          </span>
        </div>
        <div class="button">
          <input
            class="btn-cancelar"
            type="button"
            value="Cancelar"
            @click="fecharModal"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  data() {
    return {
      titulo: "",
      description: "",
      data_vencimento: "",
      status: "pendente",
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
    },
    abrirModal() {
      const modal = document.getElementById("modal");
      modal.showModal();
      console.log(modal, "open");
    },
    fecharModal() {
      const modal = document.getElementById("modal");
      modal.close();
      console.log(modal, "close");
    },
  },
};
</script>

<style scoped>
.titulo-criar-tarefa {
  color: #81858e;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: auto 0px;
}
button {
  border: none;
  background: none;
}
.criar-tarefa {
  display: flex;
  width: 678px;
  height: 45px;
  gap: 15px;
  border: 1px solid #e5e5e5;
}
.imagem-criar {
  width: 14.126px;
  height: 14px;
  margin: auto 0px;
  padding-left: 30px;
}
::placeholder {
  color: #81858e;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

input {
  border: none;
}
textarea:focus,
input:focus {
  box-shadow: 0 0 0 0;
  outline: 0;
}

#name {
  width: 150px;
  padding: 15px 0px;
}

#descricao {
  padding: 10px 0px;
}

span {
  display: flex;
  padding: 10px;
  border: solid black 1px;
  width: 210px;
  height: 36px;
  text-align: center;
  align-items: center;
}

#data {
  width: 200px;
  height: 40px;
}

.imagem-data {
  width: 15px;
  stroke-width: 1px;
  stroke: #81858e;
  padding-right: 10px;
}

.conteudo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 447px;
  padding: 10px;
}
.modal {
  width: 678px;
  height: 260px;
  padding: 20px;
  margin: auto;
  border: none;
}

.button {
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: end;
  gap: 20px;
  width: 678px;
  height: 40px;
  padding-top: 10px;
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
</style>
