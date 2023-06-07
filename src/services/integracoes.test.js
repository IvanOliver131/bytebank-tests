import api from './api';
import { buscaTransacoes, salvaTransacao } from '../services/transacoes';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '08/05/1998',
    mes: 'Maio',
  },
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisicaoErro = (retorno) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequisicaoPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockRequisicaoPostErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Requisições para API', () => {
  it('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
    expect(transacoes).toHaveLength(1);
  });

  it('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro(mockTransacao));

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
    expect(transacoes).toHaveLength(0);
  });

  it('Deve retornar um status 201 - (Created) após uma requisição POST', async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());

    const status = await salvaTransacao(mockTransacao[0]);

    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });

  it('Deve retornar um saldo de 1000 quando a requisição POST falhar', async () => {
    api.post.mockImplementation(() => mockRequisicaoPostErro());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe('Erro na requisição');
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });
});
