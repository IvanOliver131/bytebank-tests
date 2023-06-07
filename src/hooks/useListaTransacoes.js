import { useEffect, useState } from 'react';
import { buscaTransacoes } from '../services/transacoes';

export default function useListaTransacoes() {
  const [transacoes, setTransacoes] = useState([]);

  async function listaTransacoes() {
    const transacoes = await buscaTransacoes();
    setTransacoes(transacoes);
  }

  useEffect(() => {
    listaTransacoes();
  }, []);

  return [transacoes, setTransacoes];
}

// Utilizar o renderHook para renderizar hooks fora de componentes React;
// Testar hooks do React utilizando o renderHook;
// Testar hooks customizados;
// Utilizar o act para lidar com alterações de estados nos testes.
