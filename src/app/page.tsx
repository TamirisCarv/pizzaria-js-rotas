

'use client';
import ProductForm from './pizza/page';
import ProductList from './lista/page';
import { useState } from 'react';

export default function Home() {
  const [categoryId, setCategoryId] = useState('765ff95c-c3a0-4eea-847c-5788fb8a7f9a'); // Ajuste conforme necessário

  return (
    <div>
      <h1>Sistema de Pizzaria</h1>
      <ProductForm />
      <ProductList categoryId={categoryId} />
    </div>
  );
}

