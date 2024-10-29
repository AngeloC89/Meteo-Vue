<template>
    <header>
        <h1>Meteo-Vue</h1>
    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent'
    }
</script>

<style lang="scss" scoped>
header{
    width: 100%;
    height: 80px;
    background-color: black;

    h1{
        color: green;
        text-align: center;
        font-size: 4rem;
        font-weight: 600;
    }
}
</style>