import axios from 'axios'

const api = axios.create({
  baseURL: 'http://35.196.79.227:8000',
})

export async function getProdutos() {
  const response = await api.get('/products/')
  
  // Processar os produtos para construir URLs completas das imagens
  const produtos = response.data.map(produto => ({
    ...produto,
    image_path: produto.image_path 
      ? `http://35.196.79.227:8000${produto.image_path}` 
      : '/placeholder-image.jpg' // Imagem padrão se não houver imagem
  }))
  
  return produtos
}

// Variável para armazenar o token apenas em memória
let sessionToken = null

// Função para login
export async function login(email, password) {
  const response = await api.post('/login', { email, password })
  // O token vem em response.data.token
  const token = response.data.token
  if (token) {
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return response.data
}

// Função para cadastro
export async function register(name, email, password) {
  const response = await api.post('/register', { name, email, password })
  return response.data
}

// Configurar o axios para usar o token salvo, se existir
const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Remove configuração de uso do localStorage

// Outras funções para produtos, categorias, etc, podem ser adicionadas aqui futuramente. 
export default api 