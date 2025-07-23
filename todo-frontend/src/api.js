const API_BASE = "http://localhost:5000/api";

// Kullanıcı girişi
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

// Kullanıcı kaydı
export const registerUser = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

// Yeni todo ekleme
export const createTodo = async (text, token) => {
    const response = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

// Todo listesi çekme
export const getTodos = async (token) => {
    const response = await fetch(`${API_BASE}/todos`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const deleteTodo = async (id, token) => {
    const response = await fetch(`${API_BASE}/todos/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const updateTodo = async (İd, text, token) => {
    const response = await fetch (`${API_BASE}/todos/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};