'use client'; // Adicione isso no topo do arquivo

import { useEffect, useState } from 'react';
import axios from 'axios';

// Definindo a interface do produto
interface Product {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  banner: string;
  url: string;
}

// Definindo a interface das props
interface ProductListProps {
  categoryId: string;
}

const ProductList = ({ categoryId }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/category/product', {
          params: { id_categoria: categoryId },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiVGFtaXJpcyIsInVzdWFyaW8iOiJ0YW1pcmkxMjNAZ21haWwuY29tIiwiaWF0IjoxNzE4NDQ1MTA2LCJleHAiOjE3MjEwMzcxMDYsInN1YiI6IjFiMzM5OGFlLWI2Y2EtNGUyMS1hYmNkLTc2YjRjN2UwOTY2YiJ9.PKURnAs1Nbk0-Y1gMwGIkwoO5QF3odiSyROw60--cPU')}`, // Ajuste conforme a forma de autenticação que você estiver usando
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h2>Produtos da Categoria</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.url} alt={product.nome} width="100" height="100" />
            <h3>{product.nome}</h3>
            <p>{product.descricao}</p>
            <p>Preço: {product.preco}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
