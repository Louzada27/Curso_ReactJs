import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CardsGrid from '../components/CardsGrid';
import productService from '../services/productService';

const HomePage = ({ onAddToCart }) => {
  // Buscar produtos usando React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productService.getProducts(1, 3), // Pegar apenas 3 produtos para destaque
  });

  // Extrair os produtos da resposta
  const featuredProducts = data?.products || [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bem-vindo à Nossa Loja!</h1>
      <p className="mb-4">Confira nossos produtos em destaque:</p>
      
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          Erro ao carregar produtos: {error.message}
        </div>
      ) : (
        <CardsGrid
          title="Destaques"
          items={featuredProducts}
          cols={3} // Exibe 3 colunas na home
          onAddToCart={onAddToCart}
        />
      )}
      
      {/* Poderia adicionar mais seções aqui, como banners, etc. */}
    </div>
  );
};

export default HomePage; 