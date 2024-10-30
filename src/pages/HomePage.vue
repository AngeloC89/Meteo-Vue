<template>
    <div id="home" class="container">
        <!-- section for search the city -->
        <section class="d-flex align-items-center justify-content-end">
            <div id="search">
                <input type="search" v-model.trim="store.options_city.params.name" @keyup.enter="fetchCity">
                <button @click="fetchCity">Search</button>
            </div>
        </section>
        <!-- section for show the city -->

            <!-- current component -->

            <CurrentComponent />

        <section class="row mx-auto">
            <!-- print the data (today and next 2 days) -->
            <div id="daily" class="col-4" v-for="(climate, index) in store.climate?.daily?.time" :key="index">
                <div class="text-center">{{ climate }}</div>
            </div>
            <!-- print meteo condition -->
            <div id="hourly" class="col-4" v-for="(weathercode, index) in store.climate?.daily?.weather_code"
                :key="index">
                <div class="text-center">
                    <img class="w-25" :src="changeImg(weathercode)" :alt="weathercode">
                </div>
            </div>
            <div class="col-4" v-for="(climate, index) in store.climate?.daily?.temperature_2m_max" :key="index">
                <div class="text-center d-flex justify-content-around ">
                    <p>Min: {{ store.climate?.daily?.temperature_2m_min[index] }} °C</p>
                    <p class="text-center">Max: {{ climate }} °C</p>
                </div>
                <div class="text-center">Wind Max Speed: {{ store.climate?.daily?.wind_speed_10m_max[index] }} km/h</div>
            </div>


        </section>


    </div>
</template>

<script>
    import { store } from '../store.js';
    import axios from 'axios';
    import CurrentComponent from '@/components/CurrentComponent.vue';
    export default {
        name: 'HomePage',
        components: {
            CurrentComponent,
        },

        data() {
            return {
                store,
            }
        },
        methods: {
            //this function call the api with the search bar
            async fetchCity() {
                if (this.store.options_city.params.name.length < 2) return;
                try {
                    const response = await axios.get(
                        this.store.apiBaseSearch,
                        this.store.options_city
                    );
                    this.store.city = response.data.results;
                    console.log(this.store.city);
                    this.store.options_climate.params.latitude = this.store.city[0].latitude;
                    this.store.options_climate.params.longitude = this.store.city[0].longitude;
                    this.fetchClimate();//This function is called after performing city search and finds the weather data for the city
                } catch (error) {
                    console.error("Errore nel recupero dei dati", error);
                }

            },
            // this function call the api with the coordinates from city array  and get the climate data
            async fetchClimate() {

                try {
                    const response = await axios.get(
                        this.store.apiBaseClimate,
                        this.store.options_climate
                    );
                    this.store.climate = response.data;
                    console.log(this.store.climate);
                } catch (error) {
                    console.error("Errore nel recupero dei dati", error);
                }
            },

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
    #home {
        width: 100%;
        height: 100vh;
        background-color: rgb(168, 165, 165);


        // section for search the city
        #search {
            width: 500px;
            height: 200px;
            display: flex;
            justify-content: end;
            align-items: center;

            input {
                width: 300px;
                height: 40px;
                font-size: 20px;
                margin-right: 15px;
            }

            button {
                width: 100px;
                height: 40px;
                font-size: 20px;
            }
        }

         .col-4 {

            background-color: sandybrown;
            border: 1px solid black;
        }

    }
</style>