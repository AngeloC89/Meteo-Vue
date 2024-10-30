<template>
    <section class="row mx-auto">
        <!-- print the data (today and next 2 days) -->
        <div id="daily" class="col-4" v-for="(date, index) in store.climate?.daily?.time" :key="index">
            <div class="text-center">{{ date }}</div>
        </div>
        <!-- print meteo condition -->
        <div class="col-4" v-for="(weathercode, index) in store.climate?.daily?.weather_code"
            :key="index">
            <div class="text-center">
                <img class="w-25" :src="changeImg(weathercode)" :alt="weathercode">
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
        methods: {
            //this function change the weatercode in image
            changeImg(weathercode) {
                if (weathercode <= 20) {
                    return 'images/sole.png';
                } else if (weathercode > 20 && weathercode <= 40) {
                    return 'images/leggermente coperto.png';

                } else if (weathercode > 40 && weathercode <= 60) {
                    return 'images/coperto.png';

                } else if (weathercode > 60 && weathercode <= 80) {
                    return 'images/pioggia.png';

                } else {
                    return 'images/temporale.png';
                }

            }
        },
    }
</script>

<style lang="scss" scoped>
.col-4 {

    background-color: sandybrown;
    border: 1px solid black;
}

</style>