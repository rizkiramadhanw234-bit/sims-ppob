import api from "./axios";

export const servicesApi = {
  getServices: () => api.get("/services"),
};
