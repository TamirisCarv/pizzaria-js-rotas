"use client";

import React, { useState } from 'react';
import './index.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username === '' || password === '') {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Aqui você pode adicionar a lógica de autenticação, por exemplo, chamar uma API.
        if (username === 'admin' && password === 'admin') {
            console.log('Usuário autenticado com sucesso.');
            setError('');
            // Redirecionar ou realizar outras ações após o login bem-sucedido.
        } else {
            setError('Nome de usuário ou senha incorretos.');
        }
    };
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                placeholder="E-mail"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit"> Login </button>
                    </form>
                   
                    <a href="#">Ainda não é cadastrado? Cadastra-se</a>
                </div>
            </div>
            <div className="right-panel">
                <h2>Bem-vindo ao autêntico sabor italiano!</h2>
                <p>Entre e descubra o sabor da tradição em cada fatia</p>
                <a href="#">LEIA MAIS</a>
            </div>
        </div>
    );

}
