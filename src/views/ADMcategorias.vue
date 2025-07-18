<template>
    <div class="tudo" >
        <button v-if="!mostraFormulario" class="nova-categoria-btn" @click="mostraFormulario = true">Nova categoria</button>
        <div v-if="mostraFormulario" class="criacao-form-wrapper">
            <div class="criacao-form">
                <h2>Criar Categoria</h2>
                <form @submit.prevent="criarCategoria">
                    <div>
                        <label>Nome:</label>
                        <input v-model="nome" required />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <textarea v-model="descricao" required></textarea>
                    </div>
                    <div>
                        <label>Imagem:</label>
                        <input type="file" @change="onFileChange" accept="image/*" />
                    </div>
                    <button type="submit">Criar Categoria</button>
                    <button type="button" @click="fecharFormulario">Cancelar</button>
                </form>
                <p v-if="mensagem">{{ mensagem }}</p>
            </div>
        </div>
        <div class="categorias" >
        <h3 style="margin-top:2rem">Categorias do ADMIN (id 228)</h3>
        <div v-if="carregandoCategorias">Carregando categorias...</div>
        <div v-else-if="erroCategorias">{{ erroCategorias }}</div>
        <div v-else>
        <div v-if="categorias.length === 0">Nenhuma categoria cadastrada ainda.</div>
        <ul v-else>
            <li v-for="cat in categorias" :key="cat.id">
                <img v-if="cat.image_path" :src="cat.image_path.startsWith('http') ? cat.image_path : apiBase + cat.image_path" alt="Imagem da categoria" style="max-width:40px;max-height:40px;vertical-align:middle;margin-right:8px;"/>
                <b>{{ cat.name }}</b> - {{ cat.description }}
                <button @click="editarCategoria(cat)">Editar</button>
                <button @click="excluirCategoria(cat.id)">Excluir</button>
            </li>
        </ul>
        </div>
        <div v-if="editando">
            <h3>Editar Categoria</h3>
            <form @submit.prevent="atualizarCategoria">
                <div>
                    <label>Nome:</label>
                    <input v-model="editNome" required />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea v-model="editDescricao" required></textarea>
                </div>
                <div>
                    <label>Imagem:</label>
                    <input type="file" @change="onEditFileChange" accept="image/*" />
                </div>
                <button type="submit">Salvar</button>
                <button type="button" @click="cancelarEdicao">Cancelar</button>
            </form>
            <p v-if="mensagemEdicao">{{ mensagemEdicao }}</p>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const apiBase = 'http://35.196.79.227:8000'
const nome = ref('')
const descricao = ref('')
const imagem = ref(null)
const mensagem = ref('')

const categorias = ref([])
const carregandoCategorias = ref(true)
const erroCategorias = ref('')

// Edição
const editando = ref(false)
const editId = ref(null)
const editNome = ref('')
const editDescricao = ref('')
const editImagem = ref(null)
const mensagemEdicao = ref('')

const mostraFormulario = ref(false)

onMounted(async () => {
    await carregarCategorias()
})

function onFileChange(e) {
    imagem.value = e.target.files[0]
}
function onEditFileChange(e) {
    editImagem.value = e.target.files[0]
}

async function criarCategoria() {
    mensagem.value = ''
    try {
        const formData = new FormData()
        formData.append('name', nome.value)
        formData.append('description', descricao.value)
        if (imagem.value) formData.append('image', imagem.value)
        await api.post('/categories/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        mensagem.value = 'Categoria criada com sucesso!'
        nome.value = ''
        descricao.value = ''
        imagem.value = null
        await carregarCategorias()
        fecharFormulario()
    } catch (e) {
        mensagem.value = 'Erro ao criar categoria.'
    }
}

async function carregarCategorias() {
    carregandoCategorias.value = true
    erroCategorias.value = ''
    try {
        // Buscar apenas as categorias do admin 228
        const { data } = await api.get('/categories/user/228')
        categorias.value = data.map(cat => ({
            ...cat,
            image_path: cat.image_path ? (cat.image_path.startsWith('http') ? cat.image_path : apiBase + cat.image_path) : ''
        }))
    } catch (e) {
        erroCategorias.value = 'Erro ao carregar categorias.'
    } finally {
        carregandoCategorias.value = false
    }
}

function editarCategoria(cat) {
    editando.value = true
    editId.value = cat.id
    editNome.value = cat.name
    editDescricao.value = cat.description
    editImagem.value = null
    mensagemEdicao.value = ''
}
function cancelarEdicao() {
    editando.value = false
    editId.value = null
    editNome.value = ''
    editDescricao.value = ''
    editImagem.value = null
    mensagemEdicao.value = ''
}

async function atualizarCategoria() {
    mensagemEdicao.value = ''
    try {
        await api.put(`/categories/${editId.value}`, {
            name: editNome.value,
            description: editDescricao.value
        })
    // Atualizar imagem se houver
    if (editImagem.value) {
        const formData = new FormData()
        formData.append('image', editImagem.value)
        await api.put(`/categories/${editId.value}/image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
            })
        }
        mensagemEdicao.value = 'Categoria atualizada com sucesso!'
        await carregarCategorias()
        cancelarEdicao()
    } catch (e) {
        mensagemEdicao.value = 'Erro ao atualizar categoria.'
    }
}

async function excluirCategoria(id) {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return
    try {
        await api.delete(`/categories/${id}`)
        await carregarCategorias()
    } catch (e) {
        alert('Erro ao excluir categoria.')
    }
}

function fecharFormulario() {
    mostraFormulario.value = false
    nome.value = ''
    descricao.value = ''
    imagem.value = null
    mensagem.value = ''
}
</script>

<style scoped>

.tudo {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #c0c0c0;
    padding: 40px 0px 0px 70px;
}

.nova-categoria-btn {
    margin-bottom: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-start;
}

.nova-categoria-btn:hover {
    background-color: #45a049;
}

.criacao-form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.criacao-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 500px;
    text-align: center;
}

.criacao-form h2 {
    font-size: 2.5rem;
    font-family: helvetica;
    margin-bottom: 20px;
}

.criacao-form label {
    display: block;
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: bold;
}

.criacao-form input[type="text"],
.criacao-form textarea,
.criacao-form input[type="file"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.criacao-form button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    margin: 10px;
}

.criacao-form button:hover {
    background-color: #45a049;
}

.criacao-form button:last-child {
    background-color: #f44336;
}

.criacao-form button:last-child:hover {
    background-color: #da190b;
}

.categorias {
    width: 100%;
    height: 30%;
    margin-top: 20px;
}

.categorias h3 {
    font-size: 2rem;
    font-family: helvetica;
    margin-bottom: 15px;
}

.categorias ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.categorias li {
    background-color: #e0e0e0;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1rem;
}

.categorias li img {
    border-radius: 50%;
}

.categorias li button {
    background-color: #6c757d;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-left: 10px;
}

.categorias li button:hover {
    background-color: #5a6268;
}

.categorias li .edit-button {
    background-color: #007bff;
}

.categorias li .edit-button:hover {
    background-color: #0056b3;
}

.categorias li .delete-button {
    background-color: #dc3545;
}

.categorias li .delete-button:hover {
    background-color: #c82333;
}

.categorias p {
    font-size: 1.1rem;
    color: #555;
    margin-top: 10px;
}

</style>