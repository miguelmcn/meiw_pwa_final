<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-5">
        <router-link
          :to="{ name: 'tasks' }"
          tag="img"
          :src="require('@/assets/taskman_line.png')"
          style="width:250px; height:50px"
          title="Página principal do TaskMan"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-5">
          
          <div v-if="isUserLoggedIn">
            <b-nav-item :to="{ name: 'groups' }">Grupos</b-nav-item>
            <b-nav-item :to="{ name: 'logout' }">LogOut</b-nav-item>            
          </div>
          <div v-else>
            <b-nav-item :to="{ name: 'login' }">LogIn</b-nav-item>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters("auth", [
      "isUserLoggedIn",
      "getProfileName",
      "getUserType",
      "getProfile"
    ])
  }
};
</script>
