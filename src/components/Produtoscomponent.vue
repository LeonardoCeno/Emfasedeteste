<template>

<div class="tudo" >
<div class="comercial" >
    <img src="./img/bannerbaguazera.png" alt="">
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
        <div class="nome-preco-imagem" >
        <img :src="produto.image_path" alt="Imagem do produto" class="produto-imagem" />
        <h4>{{ produto.name }}</h4>
        <p>R$ {{ produto.price }}</p>
        </div>
        <div class="add">
        <button><img src="./img/maisumcarrinho.png" alt=""><p>Adicionar</p></button>
        <img src="./img/coraçaofav.png" alt="">
        </div>
    </div>
    </div>
    <button v-if="!mostrarTodos && produtos.length > 8" class="mostrar-mais" @click="mostrarTodos = true">Mostrar mais</button>
</div>
<div class="comercial" >
    <img src="./img/bannerbaguazera3.png" alt="">
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
        <div class="nome-preco-imagem" >
        <img :src="produto.image_path" alt="Imagem do produto" class="produto-imagem" />
        <h4>{{ produto.name }}</h4>
        <p>R$ {{ produto.price }}</p>
        </div>
        <div class="add" >
        <button><img src="./img/maisumcarrinho.png" alt=""><p>Adicionar</p></button>
        <img src="./img/coraçaofav.png" alt="">
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
    return mostrarTodos.value ? produtos.value : produtos.value.slice(0, 10)
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

.nome-preco-imagem {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nome-preco-imagem p {
    font-size: 22px;
    color: rgb(49, 49, 49);
    font-weight: bold;
}

.nome-preco-imagem img {
    margin-top: 10px;
    height: 225px;
    width: 160px;
    border: 0.1px solid rgb(212, 212, 212);
    filter: contrast(100%);
}

.add {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 12px;
    opacity: 0;
    pointer-events: none;
    margin-top: 5px;
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.add button {
    display: flex;
    align-items: center;
    background-color: #030a11f5;
    justify-content: center;
    padding: 8px;
    border-radius: 7px;
    gap: 7px;
    width: 150px;
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

.add img {
    width: 20px;
    height: auto;
    filter: invert(6%) sepia(50%) saturate(200%) hue-rotate(160deg) brightness(100%) contrast(100%);
}

.add img:hover {
    opacity: 0.9;
}

.produto {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    width: 230px;
    height: 92%;
    margin-top: 3vh;
    padding-left: 10px;
    padding-right: 10px;
}

.produto:hover .add {
    opacity: 1;
    pointer-events: auto;
}

.produto:hover {
    background-color: rgb(209, 209, 209);
}

.produto h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    color: rgb(65, 65, 65);
    margin-top: 10px;
    height: 40px;
}

.lista {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    padding: 4px;
    gap: 5px;
    position: relative;
}

.mostrar-mais {
    display: block;
    margin-bottom: 50px;
    padding: 6px 18px;
    background-color: #010203ec;
    color: #fcfcfc;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    left: 10px;
}
.mostrar-mais:hover {
    background-color: #02060ace;
    text-decoration: underline;
}

.soumdetalhe {
    width: 87vw;
    height: 1px;
    background-color: #888888;
}

.comercial img {
    width: 87vw;
    height: auto;
}

@media (max-width: 768px) {
    .lista {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 568px) {
    .lista {
        grid-template-columns: repeat(2, 1fr);
    }
}

</style>