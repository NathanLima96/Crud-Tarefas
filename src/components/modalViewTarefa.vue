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
      @shown="funcao"
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
            <img class="points" src="/img/svgs/VectorPoints.svg" alt="" />
            <img
              @click="hideModal"
              class="close"
              src="/img/svgs/VectorClose.svg"
              alt=""
            />
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
              <p class="titulo-sub">Subtarefas</p>
            </div>
            <div class="subTarefa" v-for="sub in tasks.subs" :key="sub.id">
              <img :src="getImagemSrc(tasks.status)" :alt="alt" />
              <p class="sub-titulo">{{ sub.description }}</p>
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
                Criar SubTarefa
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
    };
  },
  props: {
    tasks: Object,
  },
  components: {
    submodal,
  },
  methods: {
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
}

.menu {
  display: flex;
  gap: 20px;
  margin: auto 0px;
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
  border-bottom: 1px solid #e5e5e5;
}

.subTarefa {
  display: flex;
  gap: 17px;
  padding: 10px;
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
</style>