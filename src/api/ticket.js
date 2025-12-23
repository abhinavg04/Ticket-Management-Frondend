import api from "./axios";

export const createTicket = async (payload) => {
    const response = await api.post("/tickets", payload)
    return response.data
}
export const getAllTickets = async (limit = null, status = null, priority = null) => {
  const res = await api.get("/tickets", {
    params: {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(limit && { limit }),
    }
  });
  return res.data;
};

export const getAssignedTicket = async (status = null, priority = null) => {
  const res = await api.get("/tickets/assigned/me", {
    params: {
      ...(status && { status }),
      ...(priority && { priority }),
    }
  });
  return res.data;
};

export const exportTickets = async (q) => {
    const response = await api.get(`/tickets/export?q=${q}`, {
        responseType: 'blob', // 🔥 REQUIRED
    });

    const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    a.download = `${month}_${year}_tickets.xlsx`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
};
export const updateTicket = async (ticket_id, payload) => {
    const res = await api.put(`/tickets/${ticket_id}`, payload)
    return res.data
}