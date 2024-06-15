'use client';

import React, { useState } from 'react';
import { FormEvent } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
 
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
 
    async function doLogin(formEvent: FormEvent) {
        formEvent.preventDefault();
 
        if (email === "" || senha === "") {
            setError("Preencha todos os campos!");
            return;
        }
 
        try {
            const response = await axios.post("http://localhost:3333/session", {
                email: email,
                senha: senha,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                router.push("./homepage");
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            setError("Erro ao fazer login. Verifique suas credenciais.");
        }
    }
    
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content">
                    <h2>Login</h2>
                    <form onSubmit={doLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                placeholder="E-mail"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit"> Login </button>
                    </form>
                    
                    <Link className="link" href={"/cadastro"}>
                        Ainda não é cadastrado? Cadastre-se!
                    </Link>
                </div>
            </div>
        </div>
    );
}
