'use client';
import React, { useState } from 'react';
import { FormEvent } from "react";
import axios from "axios";
import "./index.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cadastro() {
    const router = useRouter();
 
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
 
    async function doCadastro(formEvent: FormEvent) {
        formEvent.preventDefault();

        // Validação do nome
        if (nome.length < 3) {
            setError("O nome deve ter pelo menos 3 caracteres!");
            return;
        }

        // Validação do email
        if (!isValidEmail(email)) {
            setError("Email inválido! Utilize o formato aaa@aaa.com");
            return;
        }

        // Validação da senha
        if (senha.length < 5) {
            setError("A senha deve ter pelo menos 5 caracteres!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3333/user", {
                email: email,
                senha: senha,
                nome: nome,
            });

            if (response.status === 200) {
                localStorage.setItem("session", response.data.token);
                router.push("/login");
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            setError("Erro ao cadastrar usuário. Verifique seus dados.");
        }
    }

    // Função para validar o formato básico de email
    function isValidEmail(email: string) {
        // Regex para verificar o formato básico de um email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content">
                    <h2>Cadastro</h2>
                    <form onSubmit={doCadastro}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="nome"
                                placeholder="Nome"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                required
                            />
                        </div>
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
                        <button type="submit">Cadastro</button>
                    </form>
                   
                    <Link className="link" href={"/login"}>
                        Já é cadastrado? Faça login!
                    </Link>
                </div>
            </div>
        </div>
    );
}
