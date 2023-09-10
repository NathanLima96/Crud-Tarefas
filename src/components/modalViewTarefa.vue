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
      <div >
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
              <p>{{tasks.id}}</p>
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
            <div class="container-btn mt-3 ">
              <img
              class="criar"
              src="/img/svgs/Vectorcriarbranco.svg"
              alt="Criar tarefa"
              />
              <button @click="$bvModal.show('sub-modal')" class="btn-criar-tarefa">
              Criar SubTarefa
            </button>
            <submodal :tasks="tasks"/>
            </div>
          </div>
          <div class="menu-lateral">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati blanditiis corporis tenetur saepe magni incidunt, dolor
              aut aliquam, atque inventore, eius explicabo! Tempore pariatur
              laudantium obcaecati sunt, exercitationem dignissimos
              consequuntur!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
              veniam fuga molestias assumenda dignissimos libero expedita
              tempora possimus magni. Tenetur a exercitationem culpa eum, nulla
              architecto odit nihil recusandae consequatur!\
            </p>
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
    tasks: Object
  },
  components:{
  submodal
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
.tarefa-titulo,
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
}

.points {
  width: 20px;
  height: 10px;
}
.close {
  width: 20px;
  height: 12px;
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
  max-width: 35%;
  background: #f7f7f7;
  padding: 30px;
}
</style>