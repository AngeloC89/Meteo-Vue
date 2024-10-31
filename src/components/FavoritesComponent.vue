<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center">
            <h1 class="text-center">Favorites</h1>
        </div>
        <div class="d-flex align-items-center justify-content-start" v-for="(city, index) in data_weater"
            :key="index">
            <div id="favorites">
                <h4>{{ city.city }}</h4>
                <img class="img-fluid" :src="store.methods.changeImg(city.data.daily.weather_code[0])" alt="">
                <p>Max: {{city.data.daily.temperature_2m_max[0] }}°C  -  Min:{{ city.data.daily.temperature_2m_min[0] }}</p>
                <p>Wind Max Speed: {{ city.data.daily.wind_speed_10m_max[index] }} km/h</p>
                <button class="btn btn-outline-danger" @click="deleteFavorites(favorite)">Elimina</button>
            </div>
        </div>


    </div>
</template>

<script>
    import axios from 'axios';
    import { store } from '../store.js';
    export default {
        name: 'FavoritesComponent',
        data() {
            return {
                store,
                data_weater: []
            }
        },

        methods: {
            getFavorites() {
                this.store.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            },

            deleteFavorites(city) {

                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                // Filtra l'array per escludere la città che vogliamo rimuovere
                favorites = favorites.filter(
                    (item) => item.lat !== city.lat || item.lon !== city.lon
                );

                // Aggiorna `localStorage` con l'array modificato
                localStorage.setItem('favorites', JSON.stringify(favorites));

                // Aggiorna anche lo store con l'array modificato
                this.store.favorites = favorites;

                // Mostra un messaggio per confermare la rimozione
                alert(`${city.name} è stata rimossa dai preferiti.`);
            },

            getWeaterData() {

                for (let i = 0; i < this.store.favorites.length; i++) {

                    this.store.options_climate.params.latitude = this.store.favorites[i].lat;
                    this.store.options_climate.params.longitude = this.store.favorites[i].lon;

                    //axios call fot get the weater data
                    axios.get(this.store.apiBaseClimate, this.store.options_climate).then((response) => {
                        this.data_weater.push({
                            city: this.store.favorites[i].name,
                            data: response.data
                        });
                    });
                }
                //debug
                console.log(this.data_weater);
            },

        },

        mounted() {
            this.getFavorites();
            this.getWeaterData();
        },
    }
</script>


<style lang="scss" scoped>
    #favorites {
        width: 800px;
        height: 100px;
        background-color: rgb(222, 222, 222);
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;

        img{
            width: 70px;
        }

        p{
            margin: 0;}
    }
</style>