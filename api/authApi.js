import api from "./axios";

export const authApi = {
  register: (data) => api.post("/registration", data),
  login: (data) => api.post("/login", data),
  getProfile: () => api.get("/profile"),
  updateProfile: (data) => api.put("/profile/update", data),
  updateImage: (data) => {
    return api.put("/profile/image", data);
  },
};
