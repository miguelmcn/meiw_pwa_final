<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Grupos" />

      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link :to="{ name: 'group', params: { groupId: '0' } }" tag="button"
            class="btn btn-outline-success mr-2 mt-2"><i class="fas fa-plus-square"></i> ADICIONAR GRUPO</router-link>
          <router-link :to="{ name: 'tasks' }" tag="button" class="btn btn-outline-info mr-2 mt-2">VOLTAR PARA TAREFAS</router-link>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>

      <!-- TABELA -->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col"> NOME </th>
                <th scope="col"> MEMBROS </th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group of groups" :key="group._id">
                <td class="pt-4">{{ group.name }}</td>
                <td class="pt-4">
                  <p v-for="user of group.users" :key="user._id">
                    {{ user.name }}
                  </p>
                </td>
                <td>
                  <router-link :to="{ name: 'group', params: { groupId: group._id } }" tag="button"
                    class="btn btn-outline-success mr-2"><i class="fas fa-edit"></i> EDITAR</router-link>
                  <button @click="removeGroup(group._id)" type="button" class="btn btn-outline-danger mr-2 "><i
                      class="fas fa-trash-alt"></i> REMOVER</button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<style></style>

<script>
import { FETCH_USERS } from "@/store/users/user.constants";
import { FETCH_GROUPS, REMOVE_GROUP } from "@/store/groups/group.constants";

import HeaderPage from "@/components/HeaderPage.vue"
import { mapGetters } from "vuex";

export default {
  name: "ManageGroups",
  components: {
    HeaderPage
  },
  data: function () {
    return {
      groups: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("group", ["getGroups", "getMessage"])
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch(`user/${FETCH_USERS}`).then(
        () => {
          this.users = this.getUsers;
        }, err => {
          this.$alert(`${err.message}`, 'Erro', 'error');
        });
    },
    fetchGroups() {
      this.$store.dispatch(`group/${FETCH_GROUPS}`).then(
        () => {
          this.groups = this.getGroups;
        }, err => {
          this.$alert(`${err.message}`, 'Erro', 'error');
        });
    },
    formatDate: d => {
      const newDate = new Date(Date.parse(d))
      return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()
    },
    removeGroup(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o grupo?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`group/${REMOVE_GROUP}`, id).then(() => {
            this.$alert(
              this.getMessage,
              "Grupo removido!",
              "success"
            );
            this.fetchUsers();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchGroups();
  }
};
</script>