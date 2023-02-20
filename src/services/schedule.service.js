import api from "@/api";

export async function getSchedules() {
  const response = await api.get(`schedule/`);
  return response.data;
}

export async function createSchedule(data) {
  const response = await api.post(`schedule/`, data);
  return response.data;
}

export async function updateSchedule(id, data) {
  const response = await api.patch(`schedule/${id}/`, data);
  return response.data;
}

export async function getAttendantsListToday(){
  const response = await api.get(`attendants-list-today/`);
  return response.data;
}

export async function getEmployeesList(){
  const response = await api.get(`employee/`);
  return response.data;
}

export async function getClientList(){
  const response = await api.get(`client/`);
  return response.data;
}

export async function getServicesList(){
  const response = await api.get(`services/`);
  return response.data;
}