import API_URL from './config.js'
import router from "@/router";

export const userService = {
  async getUsers(token) {
    const response = await fetch(`${API_URL}/users`, {
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
};

function handleResponses(code) {
  let message = ""
  switch (code) {
    case 401:
      router.push({ name: "login" });
      break;
    case 406:
      message = "Ação não aceitável. Verifique se preencheu bem todos os campos!"
      break;
    case 409:
      message = "Já existe um utilizador com este username!"
      break;
    default:
      message = "Mensagem desconhecida"
      break;
  }
  return message
}

export default userService;
