import taskService from "@/api/task.service";
import { 
  // Actions
  FETCH_TASKS, 
  ADD_TASK, 
  EDIT_TASK, 
  REMOVE_TASK, 
  // Mutations
  SET_TASKS, 
  SET_MESSAGE,
  UPDATE_LIKES 
} from "./task.constants";

const state = {
  tasks: []
};

const getters = {
  getTasks: state => state.tasks,
  getTasksById: state => id => state.tasks.find(task => task._id === id),
  getMessage: state => state.message,
  
};

const actions = {
  [FETCH_TASKS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      taskService.getTasks(rootState.auth.token)
        .then(
          res => {
            commit(SET_TASKS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_TASK]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      taskService.addTask(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O tarefa ${res.body.name} foi adicionada com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_TASK]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      taskService.editTask(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O tarefa ${res.body.name} foi atualizado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_TASK]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      taskService.removeTask(rootState.auth.token, id)
        .then(res => {
          commit(SET_MESSAGE, `O tarefa foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_TASKS]: (state, tasks) => {
    state.tasks = tasks;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}