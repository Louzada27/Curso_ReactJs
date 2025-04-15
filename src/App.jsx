import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CreateProductPage from './pages/CreateProductPage';
import Clients from './pages/Clients';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const handleAddToCart = (product) => {
    // Verificar se o produto já está no carrinho
    const isAlreadyInCart = cartItems.some(item => item.id === product.id);
    
    if (isAlreadyInCart) {
      toast.info(`${product.title} já está no carrinho!`, {
        icon: '🛒',
        duration: 2000,
      });
      return;
    }
    
    // Adicionar o produto completo ao carrinho
    setCartItems(prevItems => [...prevItems, { ...product }]);
    
    // Mostrar notificação
    toast.success(`${product.title} adicionado ao carrinho!`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  // Função para remover do carrinho
  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Produto removido do carrinho!', {
      icon: '🗑️',
      duration: 2000,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cartCount={cartItems.length} />
      <main className="container my-4 flex-grow-1">
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route
                path="/"
                element={<HomePage onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/produtos"
                element={<ProductsPage onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/produtos/novo"
                element={<CreateProductPage />}
              />
              <Route
                path="/clientes"
                element={<Clients />}
              />
              <Route
                path="/sobre"
                element={
                  <div className="container mt-4">
                    <h1 className="mb-4">Sobre Nós</h1>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Nossa História</h5>
                        <p className="card-text">
                          Somos uma empresa dedicada a oferecer os melhores produtos para nossos clientes.
                          Fundada em 2023, nossa missão é proporcionar uma experiência de compra única
                          e satisfatória para todos os nossos clientes.
                        </p>
                        <h5 className="card-title mt-4">Nossa Missão</h5>
                        <p className="card-text">
                          Oferecer produtos de alta qualidade a preços acessíveis, com um atendimento
                          excepcional e uma experiência de compra que supere as expectativas dos nossos clientes.
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Componente Toaster para mostrar notificações */}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App; 