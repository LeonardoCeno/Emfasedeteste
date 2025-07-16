<template>
    <div class="dados-container">
        <h2>Meus Dados</h2>
        <input type="file" ref="fileInput" accept="image/*" style="display:none" />
        <img :src="usuario.image_path" alt="Foto do usuário" class="foto-usuario" @click="triggerFileInput" title="Clique para alterar a foto" />
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const usuario = ref({})
const carregando = ref(true)
const erro = ref('')
const fileInput = ref(null)

onMounted(async () => {
    await carregarUsuario()
})

async function carregarUsuario() {
    try {
        const response = await api.get('/users/me')
        usuario.value = response.data
    } catch (e) {
        erro.value = 'Erro ao carregar dados do usuário.'
    } finally {
        carregando.value = false
    }
}

function triggerFileInput() {
    if (fileInput.value) fileInput.value.click()
}

</script>

<style scoped>
.dados-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
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
    font-size: 1.5rem;
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
    width: 42vw;
}

.foto-usuario {
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    border: 2px solid #000000;
    margin: 18px 0 28px 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    cursor: pointer;
    transition: 0.2s;
}

.foto-usuario:hover {
    transition: 0.2s;
    background-color: rgb(196, 196, 196);
    background-image: url('../components/img/pincel.png');
}

</style>