<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center">
            <h1 class="text-center">Favorites</h1>
        </div>
        <div class="d-flex align-items-center justify-content-start">
            <div id="favorites">
                <h2>MAH</h2>

            </div>
        </div>


    </div>
</template>

<script>
    import { store } from '../store.js';
    export default {
        name: 'FavoritesComponent',
        data() {
            return {
                store,
                favorites: [],
            }
        },

        methods: {
            




        },
        mounted() {
            this.getFovorites();
        },
    }
</script>


<style lang="scss" scoped>
    #favorites {
        width: 800px;
        height: 100px;
        background-color: green;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
    }
</style>