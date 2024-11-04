<template>
    <section class="d-flex align-items-center justify-content-center justify-content-md-end ">
        <div id="search">
            <div class="d-flex">
                <input placeholder="Search a city..." type="search" class="form-control w-75 w-md-100"
                    aria-label="Cerca..." v-model.trim="store.options_city.params.name" @keyup.enter="fetchCity">

                <button class="btn btn-outline-secondary" @click="fetchCity"><i
                        class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <span id="message"></span>
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
                document.getElementById("message").innerHTML = "";

                if (this.store.options_city.params.name.length < 2) return;
                this.store.loading = true;//loader on
                try {
                    const response = await axios.get(
                        //API url
                        this.store.apiBaseSearch,
                        this.store.options_city
                    );


                    //console.log(response.data.results[0]);
                    if (!response.data.results) {
                        const messageElement = document.getElementById("message");
                        messageElement.innerHTML = "City not found";
                        return;
                    };


                    const results = response.data.results[0] || {};

                    //create a city object
                    this.store.city = {
                        name: results.name,
                        lat: results.latitude,
                        lon: results.longitude,
                        isFavorite_flag: '',
                    };


                    this.checkIfFavorite(this.store.city);//check if the city is in the favorites
                    console.log(this.store.city);
                    this.fetchClimate(this.store.city.lat, this.store.city.lon);//This function is called after performing city search and finds the weather data for the city
                } catch (error) {
                    console.error("Errore nel recupero dei dati", error);
                } finally {
                    this.store.loading = false;//loader off
                    this.store.options_city.params.name = "";
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
                    this.store.temperatures = response.data.hourly.temperature_2m;
                    //console.log(this.store.climate);
                    //console.log(this.store.temperatures.slice(0, 24));


                } catch (error) {
                    console.error("Errore nel recupero dei dati", error);
                } finally {

                }
            },

            checkIfFavorite(city) {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const foundCity = favorites.find(fav => fav.name === city.name);

                if (foundCity) {
                    city.isFavorite_flag = true; // Imposta il flag su true se la città è nei preferiti
                } else {
                    city.isFavorite_flag = false; // Altrimenti, impostalo su false
                }
            },

        }
    }
</script>

<style lang="scss" scoped>

    // section for search the city
    #search {
        width: 500px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        margin: 5px;

        input {
            width: 300px;
            height: 40px;
            font-size: 20px;
            margin-right: 15px;
        }

        #message {
            width: 325px;
            height: 20px;
            font-size: 17px;
            text-align: start;
            color: red;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0px;
            display: flex;
            justify-content: start;
            align-items: center;
        }


    }

    button {
        width: 100px;
        height: 40px;
        font-size: 20px;
    }

</style>