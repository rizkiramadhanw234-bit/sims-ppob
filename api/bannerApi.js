import api from "./axios";

export const bannerApi = {
  getBanner: () => api.get("/banner"),
};
