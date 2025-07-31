const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(username, password) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Register failed');

    return res.text();
}

export async function login(username, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    localStorage.setItem('token', data.token);

    return data;
}

export async function fetchTodos() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Unauthorized');

    return res.json();
}