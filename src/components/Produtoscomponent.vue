<template>

<div class="tudo" >
<div class="titulo" >
<h3>PRINCIPAIS OBRAS</h3>
</div>
<div class="soumdetalhe"></div>
<div class="produtos" >
    <div v-if="carregando" class="carregando">Carregando produtos...</div>
    <div v-else-if="erro" class="erro">{{ erro }}</div>
    <div class="lista" v-else>
        <div class="produto" v-for="produto in produtosVisiveis" :key="produto.id">
        <img :src="produto.image_path" alt="Imagem do produto" class="produto-imagem" />
        <h4 class="produto-nome">{{ produto.name }}</h4>
        <p class="produto-preco">R$ {{ produto.price }}</p>
    </div>
    </div>
    <button v-if="!mostrarTodos && produtos.length > 8" class="mostrar-mais" @click="mostrarTodos = true">Mostrar mais</button>
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
        <img :src="produto.image_path" alt="Imagem do produto" class="produto-imagem" />
        <h4 class="produto-nome">{{ produto.name }}</h4>
        <p class="produto-preco">R$ {{ produto.price }}</p>
    </div>
    </div>
    <button v-if="!mostrarTodos && produtos.length > 8" class="mostrar-mais" @click="mostrarTodos = true">Mostrar mais</button>
</div>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getProdutos } from '../services/api'

const produtos = ref([])
const carregando = ref(true)
const erro = ref(null)
const mostrarTodos = ref(false)

onMounted(async () => {
    try {
        const resposta = await getProdutos()
        produtos.value = resposta
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
    background-color: #06080a;
    height: 9vh;
    width: 87vw;
    margin-bottom: 30px;
}

.titulo h3 {
    font-size: 27px;
    color: white;
}

.produtos {
    width: 87vw;
}

.produto {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 15vw;
    height: 25vh;
}

.produto img {
    height: auto;
    width: 20%;
}

.lista {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    padding: 4px;
    gap: 30px;
    position: relative;
}

.mostrar-mais {
    display: block;
    margin-bottom: 100px;
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

</style>