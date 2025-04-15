import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import productService from '../services/productService';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      toast.success('Produto criado com sucesso!', {
        duration: 5000,
        icon: '✅',
      });
      navigate('/produtos');
    },
    onError: (error) => {
      toast.error(`Erro ao criar produto: ${error.message}`, {
        duration: 5000,
      });
    }
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Preço deve ser um número positivo';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'URL da imagem é obrigatória';
    } else if (!isValidImageUrl(formData.image)) {
      newErrors.image = 'URL da imagem inválida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidImageUrl = (url) => {
    try {
      // Verifica se é uma URL válida
      new URL(url);
      return true; // Se é uma URL válida, aceitamos
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Se o campo é a imagem, atualiza o preview
    if (name === 'image') {
      if (value && isValidImageUrl(value)) {
        setIsImageLoading(true);
        setImagePreview(value);
      } else {
        setImagePreview('');
      }
    }

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setErrors(prev => ({
      ...prev,
      image: 'Não foi possível carregar a imagem'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    createProductMutation.mutate(productData);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="max-width-600">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nome do produto"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Descreva o produto"
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Preço</label>
          <div className="input-group">
            <span className="input-group-text">R$</span>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0,00"
              step="0.01"
              min="0"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">URL da Imagem</label>
          <input
            type="text"
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          
          {/* Preview da imagem */}
          {imagePreview && (
            <div className="mt-2">
              {isImageLoading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando imagem...</span>
                  </div>
                </div>
              )}
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="img-thumbnail" 
                style={{ maxHeight: '200px', display: isImageLoading ? 'none' : 'block' }}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          )}
        </div>

        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={createProductMutation.isPending}
          >
            {createProductMutation.isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Criando...
              </>
            ) : (
              'Criar Produto'
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/produtos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage; 