'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css";
import Link from "next/link";

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
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await axios.get('http://localhost:3333/category/product', {
          params: { id_categoria: categoryId },
          headers: {
            Authorization: `Bearer ${token}`,
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
    <div className="product-list-container">
      <h2 className="product-list-title">Produtos da Categoria</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <img src={product.url} alt={product.nome} width="100" height="100" />
            <h3>{product.nome}</h3>
            <p>{product.descricao}</p>
            <p>Preço: {product.preco}</p>
          </li>
        ))}
        <li className="product-item add-product-item">
          

              <Link className="link" href="/pizza" >
        Cadastrar Pizza
      </Link>
         
        </li>
      </ul>
    </div>
  );
};

export default ProductList;