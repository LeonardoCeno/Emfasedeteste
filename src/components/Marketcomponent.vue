<template>

    <div class="banner">
        <div
        class="carousel-wrapper"
        :style="{ transform: `translateX(-${indexAtual * 100}%)` }">
        <div
            class="carousel-slide"
            v-for="(banner, i) in banners"
            :key="i">
            <a :href="bannerLinks[i]" class="banner-link">
                <img class="img1" :src="banner" alt="banner" />
            </a>
        </div>
        </div>
        <div class="indicators">
            <button 
                v-for="(banner, i) in banners" 
                :key="i"
                class="indicator"
                :class="{ active: indexAtual === i }"
                @click="irParaBanner(i)">
            </button>
        </div>
        
        <button class="nav left" @click="voltar">&#10094;</button>
        <button class="nav right" @click="avancar">&#10095;</button>
    </div>
    <div class="carrosel-linha" >
        <div class="carrosel-movimento">
            <img src="./img/bannermovimento1.jpeg" alt="">
            <img src="./img/bannermovimento2.jpeg" alt="">
            <img src="./img/bannermovimento1.jpeg" alt="">
            <img src="./img/bannermovimento2.jpeg" alt="">
        </div>
    </div>
    <div class="carrosel-linha2" >
        <div class="carrosel-movimento2">
            <img src="./img/bannermovimento2.jpeg" alt="">
            <img src="./img/bannermovimento1.jpeg" alt="">
            <img src="./img/bannermovimento2.jpeg" alt="">
            <img src="./img/bannermovimento1.jpeg" alt="">
        </div>
    </div>
    <div class="beneficios">
    <div class="item">
        <img src="../components/img/caminhao.png" alt="">
        <div class="texto">
        <strong>FRETE GRÁTIS</strong><br />
        ACIMA DE R$80
        </div>
    </div>

    <div class="item">
        <img src="../components/img/cadeado.png" alt="">
        <div class="texto">
        <strong>COMPRA CERTA</strong><br />
        100% SEGURA
        </div>
    </div>

    <div class="item">
        <img src="../components/img/pix.webp" alt="">
        <div class="texto">
        <strong>PAGAMENTO</strong><br />
        VIA PIX
        </div>
    </div>

    <div class="item">
        <img src="../components/img/cartao.png" alt="">
        <div class="texto">
        <strong>PARCELAS DE</strong><br />
        ATÉ 3X SEM JUROS
        </div>
    </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import banner1 from './img/CHEGA.png'
import banner2 from './img/perfect.png'
import banner3 from './img/LIVRO.png'

const banners = [banner1, banner2, banner3]
const bannerLinks = ['', '', ''] // Links para cada banner que vou por ainda
const indexAtual = ref(0)

const avancar = () => {
    indexAtual.value = (indexAtual.value + 1) % banners.length
}

const voltar = () => {
    indexAtual.value = (indexAtual.value - 1 + banners.length) % banners.length
}

const irParaBanner = (index) => {
    indexAtual.value = index
}

onMounted(() => {
    setInterval(avancar, 6000)
})
</script>

<style scoped>

.carrosel-linha {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    overflow: hidden;
}
.carrosel-movimento {
    display: flex;
    animation: deslizar-linha 40s linear infinite;
    align-items: center;
}

@keyframes deslizar-linha {
    0% { transform: translateX(0); }
    100% { transform: translateX(-200%); }
}

.carrosel-linha2 {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    overflow: hidden;
}
.carrosel-movimento2 {
    display: flex;
    animation: deslizar-linha2 40s linear infinite;
    align-items: center;
}

@keyframes deslizar-linha2 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-200%); }
}

.banner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background-color: rgba(192, 192, 192, 0.658);
    height: 46vh;
    min-height: 300px;
    width: 100%;
    max-width: 100vw;
}

.carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
    height: 320px;
}

.carousel-slide {
    min-width: 100%;
    height: 100%;
}

.banner-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    cursor: pointer;
}

.img1 {
    width: 100%;
    height: 100%;
    display: block;
    filter: brightness(85%);
    object-position: center;
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.623);
    color: white;
    border: none;
    padding: 8px 8px;
    cursor: pointer;
    z-index: 10;
}

.left {
    left: 10px;
}

.right {
    right: 10px;
}

.indicators {
    display: flex;
    gap: 12px;
    z-index: 10;
    align-items: center;
    position: relative;
    right: 3.5px;
}

.indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #00264159;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.indicator:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(1.1);
}

.indicator.active {
    background-color: #14323b;
    transform: scale(1.3);
}

.beneficios {
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    padding: 30px 16px;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item {
    background-color: white;
    flex: 1 1 200px;
    max-width: 240px;
    min-width: 160px;
    margin: 0;
    padding: 20px 10px;
    text-align: center;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 10px;
    transition: max-width 0.2s, min-width 0.2s, padding 0.2s;
}

.item img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    margin-bottom: 16px;
    display: block;
    transition: width 0.2s, height 0.2s;
}

.item img[src*="caminhao"] {
    transform: scale(1.8);
}

.texto {
    font-size: 0.9rem;
    color: #1c1c1c;
    font-style: italic;
}

.texto strong {
    font-style: normal;
    font-weight: bold;
}

@media (max-width: 768px) {
    .banner {
    height: 30vh;
    min-height: 165px;
    width: 100%;
    }

    .indicators {
    display: none;
    }
    
    .beneficios {
    padding: 30px 16px;
    gap: 20px;
    }
    
    .item {
    padding: 20px 10px;
    }
    
    .item img {
    width: 48px;
    height: 48px;
    }
    
    .item img[src*="caminhao"] {
    transform: scale(1.8);
    }
    
    .texto {
    font-size: 0.9rem;
    }
}

@media (max-width: 650px) {
    .banner {
        height: 20vh;
        min-height: 100px;
        width: 100%;
    }
    
    .indicators {
        bottom: 10px;
        gap: 8px;
    }
    
    .indicator {
        width: 8px;
        height: 8px;
    }
    
    .beneficios {
        padding: 20px 12px;
        gap: 16px;
    }
    
    .item {
        padding: 16px 8px;
    }
    
    .item img {
        width: 40px;
        height: 40px;
    }
    
    .item img[src*="caminhao"] {
        transform: scale(1.5);
    }
    
    .texto {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .beneficios {
        padding: 16px 8px;
        gap: 12px;
    }
    
    .item {
        padding: 12px 6px;
    }
    
    .item img {
        width: 32px;
        height: 32px;
    }
    
    .item img[src*="caminhao"] {
        transform: scale(1.3);
    }
    
    .texto {
        font-size: 0.7rem;
    }
}

.espaco2 {
    background-color:  #02060af5;
    min-height: 0.2vh;
}
</style>
