import API_URL from './config.js'
import router from "@/router";

export const TaskService = {
  async getTasks(token) {
    let response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status != 401)
      throw Error(handleResponses(response.status));
      else
        router.push({ name: "login" });
    }
  },

  async addTask(token, payload) {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status != 401)
      throw Error(handleResponses(response.status));
      else
        router.push({ name: "login" });
    }
  },

  async editTask(token, payload) {
    const response = await fetch(`${API_URL}/tasks/${payload._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status != 401)
      throw Error(handleResponses(response.status));
      else
        router.push({ name: "login" });
    }
  },
  
  async removeTask(token, id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status != 401)
      throw Error(handleResponses(response.status));
      else
        router.push({ name: "login" });
    }
  }

};

function handleResponses(code) {
  let message = ""
  switch (code) {
    case 401:
      router.push({ name: "login" });
      break;
    default:
      message = "Mensagem desconhecida"
      break;
  }
  return message
}

export default TaskService;
