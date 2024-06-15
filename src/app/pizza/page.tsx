'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import "./index.css"; // Assumindo que você salva o CSS acima em um arquivo chamado index.css

export default function ProductForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [id_categoria, setIdCategoria] = useState('9cc068e7-df7a-49b5-8829-28c27b7594af');
  const [banner, setBanner] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBanner(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome || !descricao || !preco || !banner || !id_categoria) {
      setError('Preencha todos os campos');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('preco', preco);
    formData.append('id_categoria', id_categoria);
    formData.append('file', banner);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const response = await axios.post('http://localhost:3333/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Produto cadastrado com sucesso');
        setError(null);
        setNome('');
        setDescricao('');
        setPreco('');
        setBanner(null);
      } else {
        setError('Erro ao cadastrar produto');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:');
      setError(`Erro ao cadastrar produto:`);
      setSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <h2>Cadastrar Pizza</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Descrição</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div>
          <label>Preço</label>
          <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
        </div>
        <div>
          <label>Categoria</label>
          <input type="text" value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} />
        </div>
        <div>
          <label>Banner</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <Link className="link" href="/lista">
        Ver pizzas cadastradas
      </Link>
    </div>
  );
}
