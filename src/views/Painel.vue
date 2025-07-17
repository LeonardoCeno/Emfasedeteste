<template>
<Header></Header>
<div class="Tudo" >
    <div class="menuesquerdo" >
        <router-link to="/dados"> <button>Meus dados</button></router-link>
        <router-link to="/cupons"> <button>Cupons</button></router-link>
        <router-link to="/carrinho"> <button>Carrinho</button></router-link>
        <router-link to="/pedidos"> <button>Pedidos</button></router-link>
        <router-link to="/favoritos"> <button>Favortios</button></router-link>
        <router-link to="/enderecos"> <button>Endereços</button></router-link>
    </div>
    <div class="menudireito" >
        <router-view></router-view>
    </div>

</div>
<Footer></Footer>
</template>


<script setup>
import Header from '../components/Headercomponent.vue'
import Footer from '../components/Footercomponent.vue'
</script>

<style scoped>

.Tudo{
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #ff0000;
}

.menuesquerdo{
    width: 17%;
    height: 100%;
    background-color: #040d16;
    border: px solid white;
    min-width: 120px;
    z-index: 10;
}

.menuesquerdo button{
    width: 100%;
    height: 70px;
    background-color: #040d16;
    color: #ffffff;
    font-weight: bold;
    font-size: 14px;
}

.menuesquerdo button:hover{
    transition: 0.1s;
    background-color: #dbdbdb;
    color: #000000;
}

.menudireito{
    width: 88%;
    height: 100vh;
    background-color: #ffffff;
}

</style>