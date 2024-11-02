<template>
    <header>
        <h1 class="ms-3">Meteo-Vue</h1>
        <div class="d-flex gap-5">
            <div class="me-3" v-for="(link, index) in links" :key="index">
                <router-link class="text-decoration-none" :to="link.url">
                    <h4>{{ link.name }}</h4>
                </router-link>
            </div>
        </div>

    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent',
        data() {
            return {
                links: [
                    {
                        name: 'Home',
                        url: '/'
                    },
                    {
                        name: 'Preferiti',
                        url: '/favorites'
                    }
                ],
            }
        },
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