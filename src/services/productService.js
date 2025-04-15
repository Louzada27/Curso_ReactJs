import { supabase } from '../supabase';

const productService = {
  async getProducts(page = 1, perPage = 8) {
    try {
      // Calcular o offset baseado na página atual
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      // Buscar o total de produtos
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Buscar os produtos da página atual
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('title')
        .range(from, to);

      if (error) throw error;

      // Calcular o total de páginas
      const totalPages = Math.ceil(count / perPage);

      return {
        products: products || [],
        total: count,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Não foi possível carregar os produtos');
    }
  },
  
  // Buscar um produto específico
  getProduct: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async createProduct(productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new Error('Não foi possível criar o produto');
    }
  },
  
  async updateProduct(id, productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw new Error('Não foi possível atualizar o produto');
    }
  },
  
  async deleteProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw new Error('Não foi possível deletar o produto');
    }
  }
};

export default productService; 