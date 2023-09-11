<template>
  <div>
    <b-modal
      hide-backdrop
      centered
      ref="view-modal"
      size="lg"
      id="Modal-Tarefa"
      hide-footer
      hide-header
    >
      <div>
        <div class="container-menu">
          <span
            class="tarefa-data"
            :class="{
              'data-expirada': isDateExpired(tasks.data_vencimento),
              'data-atual-ou-futura': isDateCurrentOrFuture(
                tasks.data_vencimento
              ),
            }"
          >
            <img
              class="imagem-data"
              src="/img/svgs/Vectordata.svg"
              alt="data"
            />
            {{ formatDateOrToday(tasks.data_vencimento) }}
          </span>
          <div class="menu">
            <div>
              <b-dropdown
                size="sm"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <img class="points" src="/img/svgs/VectorPoints.svg" alt="" />
                </template>
                <div class="m-3">
                  <b-dropdown-item>
                    <div @click="copiarURL(tasks.id)" class="container-drop">
                      <img
                        class="img-drop-menu"
                        src="/img/svgs/VectorCopiar.svg"
                        alt=""
                      />
                      <p class="drop-menu-title">Copiar link da tarefa</p>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="container-drop">
                      <img
                        class="img-drop-menu"
                        src="/img/svgs/VectorDuplicar.svg"
                        alt=""
                      />
                      <p class="drop-menu-title">Duplicar tarefa</p>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="container-drop">
                      <img
                        class="img-drop-menu"
                        src="/img/svgs/VectorImprimir.svg"
                        alt=""
                      />
                      <p class="drop-menu-title">Imprimir tarefa</p>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div
                      @click="excluirTarefa(tasks.id)"
                      class="container-drop"
                    >
                      <img
                        class="img-drop-excluir"
                        src="/img/svgs/VectorExcluir.svg"
                        alt=""
                      />
                      <p class="drop-menu-title-excluir">Excluir tarefa</p>
                    </div>
                  </b-dropdown-item>
                </div>
              </b-dropdown>
            </div>

            <div>
              <img
                @click="hideModal"
                class="close"
                src="/img/svgs/VectorClose.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="container">
          <div class="container-conteudo">
            <div class="container-titulo">
              <img :src="getImagemSrc(tasks.status)" :alt="alt" />
              <p class="tarefa-titulo">{{ tasks.titulo }}</p>
            </div>
            <div class="container-description">
              <p class="tarefa-description">{{ tasks.description }}</p>
            </div>
            <div>
              <div>
                <p class="titulo-sub">Sub-Tarefas</p>
              </div>
              <div class="subTarefa" v-for="sub in tasks.subs" :key="sub.id">
                <div class="d-flex gap-3">
                  <img :src="getImagemSrc(tasks.status)" :alt="alt" />
                  <p v-if="!previewSub" class="sub-titulo">
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
                <div class="grupo-sub">
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
            <div class="container-btn mt-3">
              <img
                class="criar"
                src="/img/svgs/Vectorcriarbranco.svg"
                alt="Criar tarefa"
              />
              <button
                @click="$bvModal.show('sub-modal')"
                class="btn-criar-tarefa"
              >
                Criar Sub-Tarefa
              </button>
              <submodal :tasks="tasks" />
            </div>
          </div>
          <div class="menu-lateral">
            <div>
              <p class="titulos-menu-lateral">Criado em</p>
              <div class="d-flex gap-2">
                <img
                  class="imagem-data-menu"
                  src="/img/svgs/Vectordata.svg"
                  alt="data"
                />
                <p class="valores-menu-lateral">
                  {{ dateFormatCreated(tasks.created_at) }}
                </p>
              </div>
            </div>

            <div>
              <div><p class="titulos-menu-lateral">Data de Vencimento</p></div>
              <div
                class="valores-menu-lateral d-flex gap-2"
                :class="{
                  'data-expirada-menu': isDateExpired(tasks.data_vencimento),
                  'data-atual-ou-futura-menu': isDateCurrentOrFuture(
                    tasks.data_vencimento
                  ),
                }"
              >
                <img
                  class="imagem-data-menu"
                  src="/img/svgs/Vectordata.svg"
                  alt="data"
                />
                {{ formatDate(tasks.data_vencimento) }}
              </div>
            </div>
            <div class="mt-3">
              <p class="titulos-menu-lateral">Modificado em</p>

              <div class="d-flex gap-2">
                <img
                  class="imagem-data-menu"
                  src="/img/svgs/Vectordata.svg"
                  alt="data"
                />
                <p class="valores-menu-lateral">
                  {{ dateFormatUpdate(tasks.created_at) }}
                </p>
              </div>
            </div>
            <div>
              <p class="titulos-menu-lateral">ID da Tarefa</p>
              <p class="valores-menu-lateral">{{ tasks.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import submodal from "@/components/modalCriarSubTarefa.vue";
export default {
  name: "ModalTarefa",
  data() {
    return {
      src: "/img/svgs/checkboxnull.svg",
      alt: "checkbox vazio",
      resultado: "",
      previewSub: false,
    };
  },
  props: {
    tasks: Object,
  },
  components: {
    submodal,
  },
  methods: {
    async excluirTarefa(taskId) {
      const excluir = await fetch(`http://localhost:8000/tarefa/${taskId}`, {
        method: "DELETE",
      });
      const res = await excluir.json();
      window.location.reload();
    },
    copiarURL(taskId) {
      const url = `http://localhost:8000/tarefa/${taskId}`;
      navigator.clipboard.writeText(url);
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
    async excluirSubTarefa(subId) {
      const excluir = await fetch(`http://localhost:8000/subtarefa/${subId}`, {
        method: "DELETE",
      });
      const res = await excluir.json();
      window.location.reload();
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
    dateFormatCreated(date) {
      return moment(date).format("DD/MM/YYYY HH-mm");
    },
    dateFormatUpdate(date) {
      return moment(date).format("DD/MM/YYYY HH-mm");
    },

    hideModal() {
      this.$refs["view-modal"].hide();
    },
  },
};
</script>

<style scoped>
.container-btn {
  display: flex;
  gap: 10px;
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

.container-titulo {
  display: flex;
  gap: 17px;
}
.tarefa-titulo {
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.sub-titulo {
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
  line-height: 21px;
}

.container-description {
  padding-left: 35px;
  padding-top: 16px;
}

.container-menu {
  border-bottom: 1px solid #d9d9d9;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  display: flex;
  gap: 20px;
}

.points {
  width: 20px;
  height: 10px;
  cursor: pointer;
}
.close {
  width: 20px;
  height: 12px;
  cursor: pointer;
}

.tarefa-data {
  margin: auto 10px;
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
  margin: 20px;
}

.titulo-sub {
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 20px 10px;
  width: 500px;
  border-bottom: 1px solid #e5e5e5;
}

.subTarefa {
  display: flex;
  gap: 17px;
  padding: 10px;
  justify-content: space-between;
}

.grupo-sub {
  display: none;
}
.subTarefa:hover .grupo-sub {
  display: flex;
}

.excluir,
.editar,
.editarData {
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}

.menu-lateral {
  min-width: 30%;
  background: #f7f7f7;
  padding: 30px;
  height: 55vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.titulos-menu-lateral {
  color: #81858e;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.valores-menu-lateral {
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.imagem-data-menu {
  width: 13px;
  height: 14.444px;
}

.data-atual-ou-futura-menu {
  color: #009488;
}
.data-expirada-menu {
  color: #d31408;
}
.container-drop {
  display: flex;
  gap: 10px;
  align-items: center;
}

.img-drop-menu {
  width: 17px;
  height: 17px;
}
.drop-menu-title {
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 10px auto;
}

.drop-menu-title-excluir {
  color: #d31408;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 10px auto;
}
.img-drop-excluir {
  width: 15px;
  height: 17px;
}
</style>