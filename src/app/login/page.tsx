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
 
    const response = await axios.post("http://localhost:3333/session", {
      email: email,
      senha: senha,
    });
    if (response.status === 200) {
      localStorage.setItem("session", response.data.token);
      router.push("/");
    } else {
      setError(response.data.error);
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
