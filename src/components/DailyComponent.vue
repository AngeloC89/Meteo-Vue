<template>
    <section class="row mx-auto my-5">
        <!-- print the data (today and next 2 days) -->
        <div id="daily" class="col-12" v-for="(date, index) in store.climate?.daily?.time" :key="index">
            <div class="text-center">{{ date }}</div>
        </div>
        <!-- print meteo condition -->
        <div class="col-4" v-for="(weathercode, index) in store.climate?.daily?.weather_code" :key="index">
            <div class="text-center">
                <img class="w-25" :src="store.methods.changeImg(weathercode)" :alt="weathercode">
            </div>

            <div class="text-center d-flex justify-content-around ">
                <p>Min: {{ store.climate?.daily?.temperature_2m_min[index] }} °C</p>
                <p class="text-center">Max: {{ store.climate?.daily?.temperature_2m_max[index] }} °C</p>
            </div>
            <div class="text-center">Wind Max Speed: {{ store.climate?.daily?.wind_speed_10m_max[index] }} km/h
            </div>
        </div>
    </section>
</template>

<script>
    import { store } from '../store.js';
    export default {
        name: 'DailyComponent',
        data() {
            return {
                store
            }
        },
    }
</script>

<style lang="scss" scoped>

    .col-4 {

        background-color: rgba(0, 166, 255, 0.098);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);

    }


</style>