<template>
<Header></Header>
<div class="Tudo" >
    <div class="menuesquerdo" >
        <button>Meus dados</button>
        <button>Cupons</button>
        <button>Pedidos</button>
        <button>Favoritos</button>
        <button>Endereços</button>
    </div>
    <div class="menudireito" >

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
    padding-top: 17px;
    border: px solid white;
    min-width: 120px;
}

.menuesquerdo button{
    width: 100%;
    height: 70px;
    background-color: #040d16;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
}

.menuesquerdo button:hover{
    transition: 0.1s;
    background-color: #4879ff;
    color: #000000;
}

.menudireito{
    width: 88%;
    height: 100vh;
    background-color: #ffffff;
}


</style>