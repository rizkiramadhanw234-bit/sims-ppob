import api from "./axios";

export const authApi = {
  updateProfile: (data) => api.put("/profile/update", data),
  updateImage: (file) => {
    const formData = new FormData();
    formData.append("file", file); 

    return api.put("/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getProfile: () => api.get("/profile"),
};
