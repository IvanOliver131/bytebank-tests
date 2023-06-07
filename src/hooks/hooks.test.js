import { renderHook } from '@testing-library/react';
import { useState, useEffect } from 'react';

it('Hooks', () => {
  const { result } = renderHook(() => {
    const [nome, setNome] = useState('');
    useEffect(() => {
      setNome('Alice');
    }, []);

    return nome;
  });

  expect(result.current).toBe('Alice');
});
