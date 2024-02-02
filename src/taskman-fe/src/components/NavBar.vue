<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-5">
        <router-link :to="{ name: 'tasks' }" tag="img" :src="require('@/assets/taskman_line.png')"
          style="width:250px; height:50px" title="Página principal do TaskMan" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-5">

          <div v-if="isUserLoggedIn">
            <b-button variant="outline-info" class="mr-2 mt-2" :to="{ name: 'groups' }">
                <i class="fas fa-user"></i> GRUPOS
              </b-button>
            <b-button variant="outline-danger" class="mr-2 mt-2" @click="logout()">
                <i class="fas fa-sign-out-alt"></i> LOGOUT
              </b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import router from "@/router";
import { AUTH_LOGOUT_SUCCESS } from "@/store/auth/auth.constants";

export default {
  computed: {
    // ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters("auth", [
      "isUserLoggedIn",
      "getProfileName",
      "getUserType",
      "getProfile"
    ])
  },
  methods: {
    logout() {
      this.$confirm(
        "Se sim, clique em OK",
        "Queres mesmo sair do TaskMan?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.commit(`auth/${AUTH_LOGOUT_SUCCESS}`);
          router.push({ name: "login" });
        },
        () => {
          this.$alert("Estás de volta!", "Informação", "info");
        }
      );
    }
  }
};
</script>
