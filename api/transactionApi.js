import api from "./axios";

export const transactionApi = {
  getBalance: () => api.get("/balance"),
  topup: (data) => api.post("/topup", data),
  createTransaction: (data) => api.post("/transaction", data),
  getHistory: () => api.get("/transaction/history"),
};
