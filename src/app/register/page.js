'use client';
import { useState } from 'react';
import { register } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            alert('Register berhasil!');
            router.push('/login');
        } catch {
            alert('Gagal register');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-success w-100 mb-2" type="submit">Register</button>
                        <button className="btn btn-outline-secondary w-100" type="button" onClick={() => router.push('/login')}>
                            Sudah punya akun? Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
