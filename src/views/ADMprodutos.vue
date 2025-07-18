<template>
  <div>
    <h2>Criar Produto</h2>
    <form @submit.prevent="criarProduto">
      <div>
        <label>Nome:</label>
        <input v-model="nome" required />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea v-model="descricao" required></textarea>
      </div>
      <div>
        <label>Preço:</label>
        <input type="number" v-model.number="preco" min="0" step="0.01" required />
      </div>
      <div>
        <label>Estoque:</label>
        <input type="number" v-model.number="estoque" min="0" required />
      </div>
      <div>
        <label>Categoria:</label>
        <select v-model="categoriaId" required>
          <option value="" disabled>Selecione</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div>
        <label>Imagem:</label>
        <input type="file" @change="onFileChange" accept="image/*" />
      </div>
      <button type="submit">Criar Produto</button>
    </form>
    <p v-if="mensagem">{{ mensagem }}</p>

    <h3 style="margin-top:2rem">Produtos do ADMIN (id 228)</h3>
    <div v-if="carregandoProdutos">Carregando produtos...</div>
    <div v-else-if="erroProdutos">{{ erroProdutos }}</div>
    <div v-else>
      <div v-if="produtos.length === 0">Nenhum produto cadastrado ainda.</div>
      <ul v-else>
        <li v-for="produto in produtos" :key="produto.id">
          <img :src="produto.image_path" alt="Imagem do produto" style="max-width:60px;max-height:60px;vertical-align:middle;margin-right:8px;"/>
          <b>{{ produto.name }}</b> - R$ {{ produto.price }} (Estoque: {{ produto.stock }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const nome = ref('')
const descricao = ref('')
const preco = ref(0)
const estoque = ref(0)
const categoriaId = ref('')
const imagem = ref(null)
const categorias = ref([])
const mensagem = ref('')

// Produtos do admin
const produtos = ref([])
const carregandoProdutos = ref(true)
const erroProdutos = ref('')

onMounted(async () => {
  try {
    // Buscar apenas as categorias do admin 228
    const { data } = await api.get('/categories/user/228')
    categorias.value = data
  } catch (e) {
    mensagem.value = 'Erro ao carregar categorias.'
  }
  await carregarProdutos()
})

function onFileChange(e) {
  imagem.value = e.target.files[0]
}

async function criarProduto() {
  mensagem.value = ''
  try {
    const formData = new FormData()
    formData.append('name', nome.value)
    formData.append('description', descricao.value)
    formData.append('price', preco.value)
    formData.append('stock', estoque.value)
    formData.append('category_id', categoriaId.value)
    if (imagem.value) formData.append('image', imagem.value)
    await api.post('/products/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    mensagem.value = 'Produto criado com sucesso!'
    nome.value = ''
    descricao.value = ''
    preco.value = 0
    estoque.value = 0
    categoriaId.value = ''
    imagem.value = null
    await carregarProdutos()
  } catch (e) {
    mensagem.value = 'Erro ao criar produto.'
  }
}

async function carregarProdutos() {
  carregandoProdutos.value = true
  erroProdutos.value = ''
  try {
    const { data } = await api.get('/products/user/228')
    produtos.value = data.map(produto => ({
      ...produto,
      image_path: produto.image_path 
        ? `http://35.196.79.227:8000${produto.image_path}` 
        : '/placeholder-image.jpg'
    }))
  } catch (e) {
    erroProdutos.value = 'Erro ao carregar produtos.'
  } finally {
    carregandoProdutos.value = false
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}
button {
  width: fit-content;
  padding: 0.5rem 1rem;
}
ul {
  margin-top: 1rem;
  padding-left: 0;
  list-style: none;
}
li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
</style>
