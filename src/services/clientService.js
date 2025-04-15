import { supabase } from '../supabase';

const clientService = {
  async getClients() {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw new Error('Não foi possível carregar os clientes');
    }
  },
  
  async createClient(clientData) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw new Error('Não foi possível criar o cliente');
    }
  },
  
  async updateClient(id, clientData) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw new Error('Não foi possível atualizar o cliente');
    }
  },
  
  async deleteClient(id) {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw new Error('Não foi possível deletar o cliente');
    }
  }
};

export default clientService; 