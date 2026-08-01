import React, { useState } from 'react';

// Notice we don't import Signup here anymore!

export default function LoginButton({ isLoading, onClick, children = "Login " }) {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        padding: '2px 4px',
        backgroundColor: isLoading ? '#a0aec0' : (isHovered ? '#2b6cb0' : '#3182ce'),
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px'
    };

    return (
        <button
            type="submit"
            style={buttonStyle}
            disabled={isLoading}
            // 👇 FIX: Pass the prop directly, NO parentheses! 👇
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isLoading ? (
                <>
                    <span style={{ fontSize: '18px' }}>⏳</span>
                    Loggin in Account...
                </>
            ) : (
                children
            )}
        </button>
    );
}