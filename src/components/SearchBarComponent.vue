<template>
    <section class="d-flex align-items-center justify-content-end">
        <div id="search">
            <input type="search" v-model.trim="store.options_city.params.name" @keyup.enter="fetchCity">
            <button @click="fetchCity">Search</button>
        </div>
    </section>
</template>

<script>
    import { store } from '../store.js';
    import axios from 'axios';
    export default {
        name: 'SearchBarComponent',
        data() {
            return {
                store
            }
        },
        methods: {
            //this function call the api with the search bar
            async fetchCity() {
                
                if (this.store.options_city.params.name.length < 2) return;
                this.store.loading = false;
                try {
                    const response = await axios.get(
                        this.store.apiBaseSearch,
                        this.store.options_city
                    );
                    this.store.city = {
                        name: response.data.results[0].name,
                        lat: response.data.results[0].latitude,
                        lon: response.data.results[0].longitude
                    };
                    console.log(this.store.city);
                    this.fetchClimate(this.store.city.lat,this.store.city.lon );//This function is called after performing city search and finds the weather data for the city
                } catch (error) {
                    console.error("Errore nel recupero dei dati", error);
                } finally {
                    
                }

            },
            // this function call the api with the coordinates from city array  and get the climate data

            async fetchClimate(lat, lon) {
                this.store.options_climate.params.latitude = lat;
                this.store.options_climate.params.longitude = lon;
               ;

                try {
                    const response = await axios.get(
                        this.store.apiBaseClimate,
                        this.store.options_climate
                    );
                    this.store.climate = response.data;
                    console.log(this.store.climate);
                } catch (error) {
                    console.error("Errore nel recupero dei dati", error);
                } finally {
                    this.store.loading = true;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

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
</style>