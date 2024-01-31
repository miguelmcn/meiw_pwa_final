import userService from "@/api/user.service";
import {
  SET_USERS,
  SET_MESSAGE,
  FETCH_USERS,
} from "./user.constants";

const state = {
  users: [],
  message: ""
};

const getters = {
  getUsers: state => state.users,
  getUsersById: state => id => state.users.find(user => user._id === id),
  getNameById: state => id => {
    const user = state.users.find(user => user._id === id);
    return user.name;
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_USERS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      userService.getUsers(rootState.auth.token).then(
        res => {
          commit(SET_USERS, res.body);
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
};

export const mutations = {
  [SET_USERS]: (state, users) => {
    state.users = users;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
