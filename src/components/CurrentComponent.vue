<template>
    <section id="show-info" class="row mx-auto">
        <div v-if="store.city.length > 0">
            <!-- shows the city and the current climate -->
            <h1 class="text-center">{{ store.city[0].name }}</h1>
            <div>
                <p class="text-center">Previsoni del {{ store.climate?.current?.time }}</p>
                <p class="text-center">Temperatura: {{ store.climate?.current?.temperature_2m }} °C</p>
                <p class="text-center">Umidità: {{ store.climate?.current?.relative_humidity_2m }} %</p>
            </div>
        </div>
    </section>
</template>

<script>
    import { store } from '../store.js';
    export default {
        name: 'CurrentComponent',
        data() {
            return {
                store
            }
        }
    }
</script>

<style lang="scss" scoped>

    // section for show the city
    #show-info {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;

       
    }
</style>