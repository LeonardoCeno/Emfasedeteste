<template>
<div class="tudo" >
    <div class="dados-container">
        <input type="file" ref="fileInput" accept="image/*" style="display:none" @change="onFileChange" />
        <img :src="userImageUrl" alt="" class="foto-usuario" @click="triggerFileInput" title="Clique para alterar a foto" />
        <div v-if="carregando">Carregando dados...</div>
        <div v-else-if="erro" class="erro">{{ erro }}</div>
        <div v-else>
            <div class="informacoes">
                <p><strong>Nome:</strong> {{ usuario.name }}</p>
                <p><strong>Email:</strong> {{ usuario.email }}</p>
                <p><strong>Senha:</strong> ********</p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api, { getUsuario } from '../services/api'

const usuario = ref({})
const carregando = ref(true)
const erro = ref('')
const fileInput = ref(null)

const BASE_IMAGE_URL = 'http://35.196.79.227:8000' // ajuste se necessário

const userImageUrl = computed(() => {
    if (!usuario.value.image_path) return '/placeholder-image.jpg'
    return BASE_IMAGE_URL + usuario.value.image_path
})

onMounted(async () => {
    await carregarUsuario()
})

async function carregarUsuario() {
    try {
        usuario.value = await getUsuario()
    } catch (e) {
        erro.value = 'Erro ao carregar dados do usuário.'
    } finally {
        carregando.value = false
    }
}

function triggerFileInput() {
    if (fileInput.value) fileInput.value.click()
}

async function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    try {
        const response = await api.put('/users/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        usuario.value = response.data
    } catch (e) {
        erro.value = 'Erro ao atualizar imagem de perfil.'
    }
}

</script>

<style scoped>


.tudo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.dados-container {
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40%;
    background: #fff;
    padding: 32px 24px;
    font-family: 'Inter', Arial, sans-serif;
}
h2 {
    color: #000000;
    margin-bottom: 24px;
    text-align: center;
    font-size: 3vw;
}
p {
    font-size: 2vw;
    margin-bottom: 12px;
}
.erro {
    color: #e11d48;
    text-align: center;
    margin-top: 20px;
}

.informacoes {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
}

.foto-usuario {
    width: 20vw;
    height: 20vw;
    min-width: 120px;
    min-height: 120px;
    border-radius: 50%;
    border: 2px solid #000000;
    margin: 18px 0 28px 0;
    cursor: pointer;
    transition: 0.2s;
    background-position: center;
    background-repeat: no-repeat;
}

.foto-usuario:hover {
    transition: 0.1s;
    background-color: rgb(196, 196, 196);
    background-image: url('../components/img/baixar.png');
    background-size: 15%;
    opacity: 0.9;
}

</style>