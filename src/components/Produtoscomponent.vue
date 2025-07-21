<template>

<div class="tudo" >
<div class="comercial" >
    <img src="./img/banner8.jpg" alt="">
</div>
<div class="titulo" >
<h3>PRINCIPAIS OBRAS</h3>
</div>
<div class="soumdetalhe"></div>
<div class="produtos" >
    <div v-if="carregando" class="carregando">Carregando produtos...</div>
    <div v-else-if="erro" class="erro">{{ erro }}</div>
    <div class="lista" v-else>
        <div class="produto" v-for="produto in produtosVisiveis" :key="produto.id">
        <div class="nome-preco" >
        <img :src="produto.image_path" alt="Imagem do produto" class="produto-imagem" />
        <h4>{{ produto.name }}</h4>
        <p>R$ {{ produto.price }}</p>
        </div>
        <div class="add">
        <button><img src="./img/maisumcarrinho.png" alt=""><p>Adicionar</p></button>
        </div>
    </div>
    </div>
    <button v-if="!mostrarTodos && produtos.length > 8" class="mostrar-mais" @click="mostrarTodos = true">Mostrar mais</button>
</div>
<div class="comercial" >
    <img src="./img/banner7menor.jpeg" alt="">
</div>
<div id="cord" class="titulo" >
<h3>OFERTAS</h3>
</div>
<div class="soumdetalhe"></div>
<div class="produtos" >
    <div v-if="carregando" class="carregando">Carregando produtos...</div>
    <div v-else-if="erro" class="erro">{{ erro }}</div>
    <div class="lista" v-else>
        <div class="produto" v-for="produto in produtosVisiveis" :key="produto.id">
        <div class="nome-preco" >
        <img :src="produto.image_path" alt="Imagem do produto" class="produto-imagem" />
        <h4>{{ produto.name }}</h4>
        <p>R$ {{ produto.price }}</p>
        </div>
        <div class="add" >
        <button><img src="./img/maisumcarrinho.png" alt=""><p>Adicionar</p></button>
        </div>
    </div>
    </div>
    <button v-if="!mostrarTodos && produtos.length > 8" class="mostrar-mais" @click="mostrarTodos = true">Mostrar mais</button>
</div>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'

const apiBase = 'http://35.196.79.227:8000'
const produtos = ref([])
const carregando = ref(true)
const erro = ref(null)
const mostrarTodos = ref(false)

onMounted(async () => {
    try {
        const resposta = await api.get('/products/user/228')
        produtos.value = resposta.data.map(produto => ({
            ...produto,
            image_path: produto.image_path && !produto.image_path.startsWith('http')
                ? apiBase + produto.image_path
                : produto.image_path
        }))
    } catch (e) {
        erro.value = 'Erro ao carregar produtos'
    } finally {
        carregando.value = false
    }
})

const produtosVisiveis = computed(() => {
    return mostrarTodos.value ? produtos.value : produtos.value.slice(0, 8)
})


</script>


<style scoped>

.tudo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.titulo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #111d29;
    height: 9vh;
    width: 87vw;
    margin-bottom: 30px;
}

#cord {
    background-color: #3a9c73;
}

.titulo h3 {
    font-size: 27px;
    color: white;
}

.produtos {
    width: 87vw;
}

.nome-preco {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nome-preco p {
    font-size: 20px;
    color: rgb(63, 63, 63);
    margin-top: 5px;
    font-weight: bold;
}

.nome-preco img {
    margin-top: 10px;
    height: 210px;
    width: 151px;
    border: 1px solid rgb(156, 156, 156);
}

.add {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.add button {
    display: flex;
    align-items: center;
    background-color: #030a11f5;
    justify-items: center;
    padding: 8px;
    border-radius: 7px;
    gap: 7px;
}

.add button:hover {
    background-color: #02060ade;
}

.add button p {
    color: white;
}

.add button img {
    width: 20px;
    height: auto;
    border: none;
    filter: invert(1);
}

.produto {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    width: 200px;
    height: 92%;
    margin-bottom: 5vh;
}

.produto:hover {
    border: 0.2px solid rgb(165, 165, 165);
}

.produto h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: rgb(41, 41, 41);
    margin-top: 10px;
}

.lista {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    padding: 4px;
    gap: 10px;
    position: relative;
}

.mostrar-mais {
    display: block;
    margin-bottom: 90px;
    padding: 6px 18px;
    background: none;
    color: #111;
    border: none;
    border-radius: 0;
    font-size: 0.98rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: none;
    text-decoration: underline;
    position: relative;
    left: 0;
}
.mostrar-mais:hover {
    background-color: rgb(190, 190, 190);
}

.soumdetalhe {
    width: 87vw;
    margin-bottom: 40px;
    height: 1px;
    background-color: #5a5a5a;
}

.comercial img {
    width: 87vw;
    height: auto;
}

@media (max-width: 768px) {
    .lista {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 568px) {
    .lista {
        grid-template-columns: repeat(2, 1fr);
    }
}

</style>