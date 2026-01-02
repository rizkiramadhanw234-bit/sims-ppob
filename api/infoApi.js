import api from "./axios";

export const infoApi = {
  getBanner: () => api.get("/banner"),
  getServices: () => api.get("/services"),
};
