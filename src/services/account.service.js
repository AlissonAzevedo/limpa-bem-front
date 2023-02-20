import api from "@/api";

export async function LoginInAccount(loginAccountData) {
  const response = await api
    .post("/token/", loginAccountData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  if (response.status == 200) {
    const token = response?.data?.access;
    const idEmployee = response?.data?.client_id;
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("id_employee", JSON.stringify(idEmployee));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
  return response;
}

export function VerifyLogin() {
  const token = localStorage.getItem("token");
  const idEmployee = localStorage.getItem("id_employee");

  if (token) {
    if (idEmployee) {
      return true;
    }
  } else {
    return false;
  }
}

export function LogoutAccount() {
  localStorage.removeItem("token");
  localStorage.removeItem("id_employee");
  delete api.defaults.headers.common["Authorization"];
}