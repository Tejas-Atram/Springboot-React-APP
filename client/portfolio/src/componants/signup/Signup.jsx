// Signup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.js';
import SignupButton from './SignupButton';
// 1. We added 'Link' to the import here!
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('Signing up...');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            const response = await fetch('http://localhost:9006/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: user.email,
                })
            });

            if (response.ok) {
                setStatus("Signup successful! Redirecting to homepage...");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setStatus("Firebase signup worked, but Spring Boot rejected the token.");
            }

        } catch (error) {
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{maxWidth: '400px', margin: '50px auto', padding: '20px'}}>
            <h2>Create Account</h2>

            <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <SignupButton isLoading={isLoading}/>
            </form>

            {status && <p style={{ marginTop: '15px', color: '#3182ce', fontWeight: 'bold' }}>{status}</p>}

            {/* 2. ADDED: The extra navigation buttons sit neatly below the form */}
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>

                {/* Link to Login */}
                <p style={{ margin: 0 }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#3182ce', fontWeight: 'bold', textDecoration: 'none' }}>
                        Log In here
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