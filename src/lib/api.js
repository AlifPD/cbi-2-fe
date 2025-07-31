const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
    return localStorage.getItem('token');
}

export async function register(username, password) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Register failed');

    return res.text();
}

export async function login(username, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    localStorage.setItem('token', data.token);

    return data;
}

export async function fetchTodos() {
    const res = await fetch(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error('Failed to fetch todos');

    return res.json();
}

export async function createTodo(title) {
    const res = await fetch(`${API_URL}/todos/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, checked: false }),
    });

    if (!res.ok) throw new Error('Failed to create todo');

    return res.json();
}

export async function updateTodo(id, title, checked) {
    const res = await fetch(`${API_URL}/todos/update?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, checked }),
    });

    if (!res.ok) throw new Error('Failed to update todo');

    return res.json();
}

export async function deleteTodo(id) {
    const res = await fetch(`${API_URL}/todos/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) throw new Error('Failed to delete todo');

    return res.text();
}