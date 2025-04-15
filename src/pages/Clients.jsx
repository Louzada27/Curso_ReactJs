import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ClientTable from '../components/ClientTable';
import clientService from '../services/clientService';

const Clients = () => {
  // Buscar clientes usando React Query
  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getClients
  });

  if (isLoading) return <div className="text-center">Carregando...</div>;
  if (error) return <div className="alert alert-danger">{error.message}</div>;
  if (!clients?.length) return <div className="alert alert-warning">Nenhum cliente encontrado.</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Clientes</h1>
      <ClientTable clients={clients} />
    </div>
  );
};

export default Clients; 