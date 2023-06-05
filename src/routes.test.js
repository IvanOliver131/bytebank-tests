import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './paginas/Principal/App'

describe('Rotas', () => {
  it('Deve renderizar a rota principal', () => {
    render(<App />, { wrapper: BrowserRouter })

    const usuario = screen.getByText('Olá, Joana :)!')

    expect(usuario).toBeInTheDocument()
  })
})