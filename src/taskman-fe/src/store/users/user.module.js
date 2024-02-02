import userService from "@/api/user.service";
import {
  SET_USERS,
  SET_MESSAGE,
  FETCH_USERS,
  ADD_USER,
  EDIT_USER,
  REMOVE_USER
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
  [FETCH_USERS]: async ({ commit }) => {
    return new Promise((resolve, reject) => {
      userService.getUsers(localStorage.STORAGE_ACCESS_TOKEN).then(
        res => {
          commit(SET_USERS, res.body);
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [ADD_USER]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      userService.addUser(localStorage.STORAGE_ACCESS_TOKEN, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O utilizador ${res.body.name} foi adicionado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [EDIT_USER]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      userService.editUser(localStorage.STORAGE_ACCESS_TOKEN, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O utilizador ${res.body.name} foi atualizado com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },
  [REMOVE_USER]: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      userService.removeUser(localStorage.STORAGE_ACCESS_TOKEN, id).then(
        res => {
          commit(SET_MESSAGE, `O utilizador foi removido com sucesso!`);
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
