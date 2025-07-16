<template>
<div class="tudo" >
    <div class="dados-container">
        <input type="file" ref="fileInput" accept="image/*" style="display:none" @change="onFileChange" />
        <img :src="userImageUrl" alt="" class="foto-usuario" @click="triggerFileInput" title="Clique para alterar a foto" />
        <div v-if="carregando">Carregando dados...</div>
        <div v-else-if="erro" class="erro">{{ erro }}</div>
        <div v-else>
            <div class="informacoes">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span v-if="!editandoNome && hoverNome" style="margin-right: 8px; cursor: pointer;">✏️</span>
                    <template v-if="editandoNome">
                        <input v-model="novoNome" @blur="salvarNome" @keyup.enter="salvarNome" type="text" style="font-size: 2vw;" autofocus />
                    </template>
                    <template v-else>
                        <p @mouseenter="hoverNome = true" @mouseleave="hoverNome = false" @click="editarNome" style="margin: 0; cursor: pointer;"><strong>Nome:</strong> {{ usuario.name }}</p>
                    </template>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span v-if="!editandoEmail && hoverEmail" style="margin-right: 8px; cursor: pointer;">✏️</span>
                    <template v-if="editandoEmail">
                        <input v-model="novoEmail" @blur="salvarEmail" @keyup.enter="salvarEmail" type="email" style="font-size: 2vw;" autofocus />
                    </template>
                    <template v-else>
                        <p @mouseenter="hoverEmail = true" @mouseleave="hoverEmail = false" @click="editarEmail" style="margin: 0; cursor: pointer;"><strong>Email:</strong> {{ usuario.email }}</p>
                    </template>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span v-if="!editandoSenha && hoverSenha" style="margin-right: 8px; cursor: pointer;">✏️</span>
                    <template v-if="editandoSenha">
                        <input v-model="novaSenha" @blur="salvarSenha" @keyup.enter="salvarSenha" type="password" style="font-size: 2vw;" placeholder="Nova senha" autofocus />
                    </template>
                    <template v-else>
                        <p @mouseenter="hoverSenha = true" @mouseleave="hoverSenha = false" @click="editarSenha" style="margin: 0; cursor: pointer;"><strong>Senha:</strong> ********</p>
                    </template>
                </div>
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

// Estados de edição e valores temporários
const editandoNome = ref(false)
const editandoEmail = ref(false)
const editandoSenha = ref(false)
const hoverNome = ref(false)
const hoverEmail = ref(false)
const hoverSenha = ref(false)
const novoNome = ref('')
const novoEmail = ref('')
const novaSenha = ref('')

onMounted(async () => {
    await carregarUsuario()
})

async function carregarUsuario() {
    try {
        usuario.value = await getUsuario()
        novoNome.value = usuario.value.name
        novoEmail.value = usuario.value.email
        novaSenha.value = ''
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

function editarNome() {
    editandoNome.value = true
    novoNome.value = usuario.value.name
}
async function salvarNome() {
    if (novoNome.value && novoNome.value !== usuario.value.name) {
        try {
            const response = await api.put('/users/me', { name: novoNome.value, email: usuario.value.email })
            usuario.value = response.data
        } catch (e) {
            erro.value = 'Erro ao atualizar nome.'
        }
    }
    editandoNome.value = false
}

function editarEmail() {
    editandoEmail.value = true
    novoEmail.value = usuario.value.email
}
async function salvarEmail() {
    if (novoEmail.value && novoEmail.value !== usuario.value.email) {
        try {
            const response = await api.put('/users/me', { name: usuario.value.name, email: novoEmail.value })
            usuario.value = response.data
        } catch (e) {
            erro.value = 'Erro ao atualizar email.'
        }
    }
    editandoEmail.value = false
}

function editarSenha() {
    editandoSenha.value = true
    novaSenha.value = ''
}
async function salvarSenha() {
    if (novaSenha.value) {
        try {
            const response = await api.put('/users/me', { name: usuario.value.name, email: usuario.value.email, password: novaSenha.value })
            usuario.value = response.data
        } catch (e) {
            erro.value = 'Erro ao atualizar senha.'
        }
    }
    editandoSenha.value = false
    novaSenha.value = ''
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