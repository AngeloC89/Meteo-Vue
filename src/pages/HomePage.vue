<template>
    <div id="home" class="container">
        <!-- section for search the city -->
        <section class="d-flex align-items-center justify-content-end">
            <div id="search">
                <input type="search" v-model.trim="store.options_city.params.name" @keyup.enter="fetchCity">
                <button @click="fetchCity">Search</button>
            </div>
        </section>

        <!-- current component -->
        <CurrentComponent />

        <!-- daily component -->
        <DailyComponent />


    </div>
</template>

<script>
    import { store } from '../store.js';
    import axios from 'axios';
    import CurrentComponent from '@/components/CurrentComponent.vue';
    import DailyComponent from '@/components/DailyComponent.vue';
    export default {
        name: 'HomePage',
        components: {
            CurrentComponent,
            DailyComponent
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


    }
</style>