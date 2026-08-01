// Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.js';
import { useNavigate, Link } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('Logging in...');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setStatus('Login successful! Redirecting...');

            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error) {
            setStatus(`Error: Invalid email or password.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>Welcome Back</h2>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <LoginButton isLoading={isLoading} />
            </form>

            {status && <p style={{ marginTop: '15px', color: '#3182ce', fontWeight: 'bold' }}>{status}</p>}

            {/* Added: The identical navigation structure from your Signup page */}
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>

                {/* Link to Signup */}
                <p style={{ margin: 0 }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#3182ce', fontWeight: 'bold', textDecoration: 'none' }}>
                        Sign Up here
                    </Link>
                </p>

                {/* Button to Homepage */}
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        color: '#4a5568',
                        border: '1px solid #cbd5e0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        marginTop: '10px'
                    }}
                >
                    ← Back to Homepage
                </button>

            </div>
        </div>
    );
}