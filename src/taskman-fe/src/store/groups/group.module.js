import groupService from "@/api/group.service";
import { 
  // Actions
  FETCH_GROUPS, 
  ADD_GROUP, 
  EDIT_GROUP, 
  REMOVE_GROUP, 
  // Mutations
  SET_GROUPS, 
  SET_MESSAGE,
  UPDATE_LIKES 
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
  [FETCH_GROUPS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      groupService.getGroups(rootState.auth.token)
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
  [ADD_GROUP]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      groupService.addGroup(rootState.auth.token, payload)
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
  [EDIT_GROUP]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      groupService.editGroup(rootState.auth.token, payload)
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
  [REMOVE_GROUP]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      groupService.removeGroup(rootState.auth.token, id)
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}