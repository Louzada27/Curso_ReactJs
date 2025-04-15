import React from 'react';

const ClientTable = ({ clients }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>E-mail</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <img
                  src={client.profile_url}
                  alt={`Foto de ${client.name}`}
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{client.name}</td>
              <td>{new Date(client.birth_date).toLocaleDateString('pt-BR')}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable; 