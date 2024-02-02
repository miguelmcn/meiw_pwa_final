import API_URL from './config.js'
import router from "@/router";

export const GroupService = {
  async getGroups(token) {
    let response = await fetch(`${API_URL}/groups`, {
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

  async addGroup(token, payload) {
    const response = await fetch(`${API_URL}/groups`, {
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

  async editGroup(token, payload) {
    const response = await fetch(`${API_URL}/groups/${payload._id}`, {
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

  async removeGroup(token, id) {
    const response = await fetch(`${API_URL}/groups/${id}`, {
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

export default GroupService;
