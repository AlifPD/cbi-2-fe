'use client';
import { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function TodosPage() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetchTodos()
            .then(setTodos)
            .catch(() => {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                router.push('/login');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        try {
            const newTodo = await createTodo(newTitle);
            setTodos([...todos, newTodo]);
            setNewTitle('');
        } catch {
            alert('Gagal menambahkan item');
        }
    };

    const handleToggle = async (todo) => {
        try {
            const updated = await updateTodo(todo.id, todo.title, !todo.checked);
            setTodos(todos.map(t => (t.id === todo.id ? updated : t)));
        } catch {
            alert('Gagal update');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus?')) return;
        try {
            await deleteTodo(id);
            setTodos(todos.filter(t => t.id !== id));
        } catch {
            alert('Gagal hapus');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>To Do List</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            <form onSubmit={handleAddTodo} className="d-flex gap-2 mb-4">
                <input
                    className="form-control"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Judul baru"
                />
                <button className="btn btn-primary" type="submit">Tambah</button>
            </form>

            {loading ? <p>Loading...</p> : (
                <ul className="list-group">
                    {todos.map(todo => (
                        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={todo.checked}
                                    onChange={() => handleToggle(todo)}
                                    className="form-check-input me-2"
                                />
                                {todo.title}
                            </div>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(todo.id)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
