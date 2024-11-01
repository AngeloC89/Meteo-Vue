<template>
    <header>
        <h1>Meteo-Vue</h1>
        <div class="d-flex gap-5">
            <router-link class="text-decoration-none" to="/">
                <h4>Home</h4>
            </router-link>
            <router-link class="text-decoration-none" to="/favorites">
                <h4>Preferiti</h4>
            </router-link>
        </div>

    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent'
    }
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        height: 60px;
        background-color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        position: fixed;

        h1 {
            color: green;
            text-align: center;
            font-size: 4rem;
            font-weight: 600;
        }
    }
</style>