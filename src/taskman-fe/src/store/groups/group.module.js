import groupService from "@/api/group.service";
import { 
  // Actions
  FETCH_GROUPS, 
  ADD_GROUP, 
  EDIT_GROUP, 
  REMOVE_GROUP, 
  // Mutations
  SET_GROUPS, 
  SET_MESSAGE
} from "./group.constants";

const state = {
  groups: []
};

const getters = {
  getGroups: state => state.groups,
  getGroupsById: state => id => state.groups.find(group => group._id === id),
  getMessage: state => state.message,
  
};

const actions = {
  [FETCH_GROUPS]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      groupService.getGroups(localStorage.STORAGE_ACCESS_TOKEN)
        .then(
          res => {
            commit(SET_GROUPS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_GROUP]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      groupService.addGroup(localStorage.STORAGE_ACCESS_TOKEN, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O grupo ${res.body.name} foi adicionado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_GROUP]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      groupService.editGroup(localStorage.STORAGE_ACCESS_TOKEN, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O grupo ${res.body.name} foi atualizado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_GROUP]: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      groupService.removeGroup(localStorage.STORAGE_ACCESS_TOKEN, id)
        .then(res => {
          commit(SET_MESSAGE, `O grupo foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_GROUPS]: (state, groups) => {
    state.groups = groups;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}