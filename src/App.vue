<template>
    <Home>
        <template #header>
            <Header></Header>
        </template>

        <template #main>
            <router-view />
        </template>

        <template #footer>
            <Footer></Footer>
        </template>
    </Home>
    
</template>

<script setup>
    import Home from './components/Home.vue'
    import Header from './components/Header.vue'
    import Main from './components/Main.vue'
    import Footer from './components/Footer.vue'
</script>

<style scoped>

</style>