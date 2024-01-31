import Vue from "vue";
import Vuex from "vuex";

import moduleAuth from "./auth/auth.module";

import moduleUser from "./users/user.module";
import moduleGroup from "./groups/group.module";
import moduleTask from "./tasks/task.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: moduleAuth,
    user: moduleUser,
    group: moduleGroup,
    task: moduleTask
  }
});
