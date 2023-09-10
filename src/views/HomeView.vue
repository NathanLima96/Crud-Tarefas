<template>
  <div class="container">
    <div class="my-custom-navbar">
      <div class="nav-itens">
        <div class="logo">
          <img class="icone" src="/img/icone.png" alt="icone" />
        </div>
        <div class="itens">
          <div class="container-btn">
            <img
              class="criar"
              src="/img/svgs/Vectorcriar.svg"
              alt="Criar tarefa"
            />
            <button @click="$bvModal.show('my-modal')" class="btn-criar-tarefa">
              Criar Tarefa
            </button>
          </div>
          <img
            class="interrogacao"
            src="/img/svgs/Vectorinterrogação.svg"
            alt="Interrogação"
          />
          <img
            class="sininho"
            src="/img/svgs/Vectorsininho.svg"
            alt="Sino de notificação"
          />
          <img class="perfil" src="/img/svgs/perfil.svg" alt="Perfil" />
        </div>
      </div>
    </div>
    <div class="container-main">
      <div class="container-menu">
        <a href="#" @click="mostrarTodasTarefas">
          <img src="/img/svgs/Vectorentrada.svg" alt="entrada" />Entrada
        </a>
        <a href="#" @click="mostrarTarefasDeHoje">
          <img src="/img/svgs/Vectordata.svg" alt="data" />Tarefas de Hoje
        </a>

        <a href="#" @click="filtrarTarefasVencidas">
          <img src="/img/svgs/Vectorexclamacao.svg" alt="Alerta" />Vencidos
        </a>
      </div>
      <div class="container-conteudo">
        <div class="container-titulo-conteudo">
          <h1 class="titulo-entrada">Entrada</h1>
        </div>
        <div class="container-tarefa" v-for="task in tasks" :key="task.id">
          <div class="container-titulo-principal">
            <div class="container-titulo">
              <img
                v-on:click="alterarStatus(task)"
                v-on:dblclick="reverterStatus(task)"
                :src="getImagemSrc(task.status)"
                :alt="alt"
              />
              <button
                v-if="!preview"
                @click="$bvModal.show('Modal-Tarefa'), funcao(task)"
                class="tarefa-button"
              >
                <p class="tarefa-titulo">{{ task.titulo }}</p>
              </button>
              <div v-else>
                <input v-model="task.titulo" @blur="editarTarefa2(task)" />
              </div>
            </div>
            <div class="container-data">
              <p v-if="!preview" class="tarefa-description">
                {{ task.description }}
              </p>
              <p v-else>
                <input
                  type="text"
                  class="input-description"
                  v-model="task.description"
                  @blur="editarTarefa2(task)"
                />
              </p>
              <span
                v-if="!previewData"
                class="tarefa-data"
                :class="{
                  'data-expirada': isDateExpired(task.data_vencimento),
                  'data-atual-ou-futura': isDateCurrentOrFuture(
                    task.data_vencimento
                  ),
                }"
              >
                <img
                  class="imagem-data"
                  src="/img/svgs/Vectordata.svg"
                  alt="data"
                />
                {{ formatDateOrToday(task.data_vencimento) }}
              </span>
              <p v-else>
                <input
                  type="date"
                  id="data-input"
                  v-model="task.data_vencimento"
                  @blur="editarData2(task)"
                />
              </p>
            </div>
          </div>
          <div>
            <div class="container-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="107"
                height="18"
                viewBox="0 0 107 18"
                fill="none"
              >
                <path
                  class="editarData"
                  @click="editarData(task.id)"
                  @dblclick="editarData2(task.id)"
                  d="M57.1111 1V4.2M50.8889 1V4.2M47 7.4H61M48.5556 2.6H59.4444C60.3036 2.6 61 3.31634 61 4.2V15.4C61 16.2837 60.3036 17 59.4444 17H48.5556C47.6964 17 47 16.2837 47 15.4V4.2C47 3.31634 47.6964 2.6 48.5556 2.6Z"
                  stroke="#81858E"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  @click="editarTarefa(task.id)"
                  @dblclick="editarTarefa2(task.id)"
                  class="editar"
                  d="M13.1038 1.66848C13.3158 1.45654 13.5674 1.28843 13.8443 1.17373C14.1212 1.05903 14.418 1 14.7177 1C15.0174 1 15.3142 1.05903 15.5911 1.17373C15.868 1.28843 16.1196 1.45654 16.3315 1.66848C16.5435 1.88041 16.7116 2.13201 16.8263 2.40891C16.941 2.68582 17 2.9826 17 3.28232C17 3.58204 16.941 3.87882 16.8263 4.15573C16.7116 4.43263 16.5435 4.68423 16.3315 4.89617L5.43807 15.7896L1 17L2.21038 12.5619L13.1038 1.66848Z"
                  stroke="#81858E"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  @click="excluirTarefa(task.id)"
                  class="excluir"
                  d="M91 4.2H92.6667M92.6667 4.2H106M92.6667 4.2V15.4C92.6667 15.8243 92.8423 16.2313 93.1548 16.5314C93.4674 16.8314 93.8913 17 94.3333 17H102.667C103.109 17 103.533 16.8314 103.845 16.5314C104.158 16.2313 104.333 15.8243 104.333 15.4V4.2M95.1667 4.2V2.6C95.1667 2.17565 95.3423 1.76869 95.6548 1.46863C95.9674 1.16857 96.3913 1 96.8333 1H100.167C100.609 1 101.033 1.16857 101.345 1.46863C101.658 1.76869 101.833 2.17565 101.833 2.6V4.2M96.8333 8.2V13M100.167 8.2V13"
                  stroke="#81858E"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            class="container-sub-tarefa"
            v-if="task.subs && task.subs.length > 0"
          >
            <div
              class="container-sub-titulo"
              v-for="sub in task.subs"
              :key="sub.id"
            >
              <div class="d-flex gap-1">
                <img
                  v-on:click="alterarStatus(task)"
                  v-on:dblclick="reverterStatus(task)"
                  :src="getImagemSrc(task.status)"
                  :alt="alt"
                />

                <p v-if="!previewSub" class="tarefa-description">
                  {{ sub.description }}
                </p>
                <p v-else>
                  <input
                    type="text"
                    class="input-description"
                    v-model="sub.description"
                    @blur="editarSubTarefa2(sub)"
                  />
                </p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="107"
                  height="18"
                  viewBox="0 0 107 18"
                  fill="none"
                >
                  <path
                    class="editarData"
                    d="M57.1111 1V4.2M50.8889 1V4.2M47 7.4H61M48.5556 2.6H59.4444C60.3036 2.6 61 3.31634 61 4.2V15.4C61 16.2837 60.3036 17 59.4444 17H48.5556C47.6964 17 47 16.2837 47 15.4V4.2C47 3.31634 47.6964 2.6 48.5556 2.6Z"
                    stroke="#81858E"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    @click="editarSubTarefa()"
                    @dblclick="editarSubTarefa2()"
                    class="editar"
                    d="M13.1038 1.66848C13.3158 1.45654 13.5674 1.28843 13.8443 1.17373C14.1212 1.05903 14.418 1 14.7177 1C15.0174 1 15.3142 1.05903 15.5911 1.17373C15.868 1.28843 16.1196 1.45654 16.3315 1.66848C16.5435 1.88041 16.7116 2.13201 16.8263 2.40891C16.941 2.68582 17 2.9826 17 3.28232C17 3.58204 16.941 3.87882 16.8263 4.15573C16.7116 4.43263 16.5435 4.68423 16.3315 4.89617L5.43807 15.7896L1 17L2.21038 12.5619L13.1038 1.66848Z"
                    stroke="#81858E"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    @click="excluirSubTarefa(sub.id)"
                    class="excluir"
                    d="M91 4.2H92.6667M92.6667 4.2H106M92.6667 4.2V15.4C92.6667 15.8243 92.8423 16.2313 93.1548 16.5314C93.4674 16.8314 93.8913 17 94.3333 17H102.667C103.109 17 103.533 16.8314 103.845 16.5314C104.158 16.2313 104.333 15.8243 104.333 15.4V4.2M95.1667 4.2V2.6C95.1667 2.17565 95.3423 1.76869 95.6548 1.46863C95.9674 1.16857 96.3913 1 96.8333 1H100.167C100.609 1 101.033 1.16857 101.345 1.46863C101.658 1.76869 101.833 2.17565 101.833 2.6V4.2M96.8333 8.2V13M100.167 8.2V13"
                    stroke="#81858E"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <mymodal />
        </div>
        <ModalTarefa :tasks="tarefa" />
      </div>
    </div>
  </div>
</template>

<script>
import ModalTarefa from "@/components/modalViewTarefa.vue";
import mymodal from "@/components/modalCriarTarefa.vue";
import moment from "moment";
export default {
  name: "HomeView",
  data() {
    return {
      tasks: [],
      src: "/img/svgs/checkboxnull.svg",
      alt: "checkbox vazio",
      preview: false,
      previewData: false,
      previewSub: false,
      tarefa: {},
    };
  },
  components: {
    mymodal,
    ModalTarefa,
  },
  methods: {
    funcao(task) {
      this.tarefa = task;
    },

    async getTarefas() {
      const req = await fetch("http://localhost:8000/tarefa");

      const data = await req.json();

      this.tasks = data;
    },

    async excluirTarefa(taskId) {
      const excluir = await fetch(`http://localhost:8000/tarefa/${taskId}`, {
        method: "DELETE",
      });
      const res = await excluir.json();
      window.location.reload();
    },
    async excluirSubTarefa(subId) {
      const excluir = await fetch(`http://localhost:8000/subtarefa/${subId}`, {
        method: "DELETE",
      });
      const res = await excluir.json();
      window.location.reload();
    },

    editarTarefa() {
      this.preview = true;
    },

    async editarTarefa2(task) {
      const editar = await fetch(`http://localhost:8000/tarefa/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: task.titulo,
          description: task.description,
        }),
      });
      this.preview = false;
    },
    editarSubTarefa() {
      this.previewSub = true;
    },

    async editarSubTarefa2(sub) {
      const editar = await fetch(`http://localhost:8000/subtarefa/${sub.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: sub.description,
        }),
      });
      this.previewSub = false;
    },

    editarData() {
      this.previewData = true;
    },

    async editarData2(task) {
      const formattedDate = moment(task.data_vencimento).format("YYYY-MM-DD");

      fetch(`http://localhost:8000/tarefa/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data_vencimento: formattedDate,
        }),
      });
      this.previewData = false;
    },

    alterarStatus(task) {
      task.status = "concluida";

      fetch(`http://localhost:8000/tarefa/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "concluida" }),
      });
    },

    reverterStatus(task) {
      task.status = "pendente";
      fetch(`http://localhost:8000/tarefa/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "pendente" }),
      });
    },

    getImagemSrc(status) {
      if (status === "concluida") {
        return "/img/svgs/checkboxgreen.svg";
      } else {
        return "/img/svgs/checkboxnull.svg";
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    isDateExpired(date) {
      const currentDate = moment();
      return moment(date).isBefore(currentDate, "day");
    },

    isDateCurrentOrFuture(date) {
      const currentDate = moment();
      return moment(date).isSameOrAfter(currentDate, "day");
    },
    isDateToday(date) {
      const currentDate = moment();
      return moment(date).isSame(currentDate, "day");
    },

    formatDateOrToday(date) {
      if (this.isDateToday(date)) {
        return "hoje";
      }
      return moment(date).format("DD/MM/YYYY");
    },
    filtrarTarefasVencidas() {
      this.tasks = this.tasks.filter((task) =>
        this.isDateExpired(task.data_vencimento)
      );
    },

    mostrarTodasTarefas() {
      this.getTarefas();
    },

    mostrarTarefasDeHoje() {
      const tarefasDeHoje = this.tasks.filter((task) =>
        this.isDateToday(task.data_vencimento)
      );
      this.tasks = tarefasDeHoje;
    },
  },

  mounted() {
    this.getTarefas();
  },
};
</script>

<style scoped>
input {
  border: solid 1px #81858e;
}
.input-description {
  width: 300px;
}

.excluir,
.editar,
.editarData {
  cursor: pointer;
}

#data-input {
  width: 130px;
  height: 30px;
  text-align: center;
}

.data-expirada {
  background: rgba(211, 20, 8, 0.1);
  color: #d31408;
}
.data-atual-ou-futura {
  background: rgba(0, 148, 136, 0.1);
  color: #009488;
}
.container-conteudo {
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  display: none;
}

.container-titulo {
  display: flex;
  gap: 17px;
}
.container-sub-titulo {
  display: flex;
  gap: 17px;
  padding: 10px;
  justify-content: space-between;
}

.container-data {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.titulo-entrada {
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.container-tarefa {
  border: 1px solid #e5e5e5;
  width: 678px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container-tarefa:hover .container-group {
  display: flex;
  justify-content: end;
}
.container-group {
  display: none;
  position: relative;
  top: -70px;
  margin-right: 30px;
}

.container-sub-tarefa {
  border: 1px solid #e5e5e5;
  padding: 20px;
}

.container-titulo-principal {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.tarefa-button {
  background: none;
  border: none;
}

.tarefa-titulo,
.sub-tarefa-titulo {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0px;
}

.tarefa-description {
  color: #81858e;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 27px;
  margin-bottom: 0px;
}

.tarefa-data {
  width: 116px;
  height: 25px;
  text-align: center;
  margin-left: 27px;
}

.imagem-data {
  width: 13px;
  height: 14.444px;
}

.container {
  width: 1280px;
  margin: 20px auto;
  height: 100vh;
}

.icone {
  width: 28px;
  height: 28px;
}

.criar {
  width: 14px;
  height: 14px;
  display: flex;
}

.container-btn {
  display: flex;
  gap: 10px;
}

.container-btn:hover .btn-criar-tarefa {
  display: flex;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
}

.interrogacao {
  width: 20px;
  height: 20px;
}

.sininho {
  width: 18px;
  height: 19.996px;
}

.perfil {
  width: 30px;
  height: 30px;
}
.my-custom-navbar {
  background: #000;
  width: 1280px;
  height: 70px;
}
.nav-itens {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 18px 15px 0px 15px;
}

.itens {
  display: flex;
  gap: 45px;
  align-items: center;
}

.container-main {
  display: flex;
  width: 1280px;
  margin: 0px auto;
}

.container-menu {
  background: #fafafa;
  width: 350px;
  height: 694px;
  display: flex;
  flex-direction: column;
  padding: 46px;
  padding-top: 63px;
  gap: 46px;
}

.container-menu a {
  text-decoration: none;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.container-menu a img {
  padding-right: 20px;
}
</style>
