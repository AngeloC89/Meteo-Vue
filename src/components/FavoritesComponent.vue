<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center">
            <h1 class="text-center">Favorites</h1>
        </div>
        <div class="d-flex align-items-center justify-content-center" v-for="(city, index) in data_weater"
            :key="index">
            <div id="favorites">
                <h4>{{ city.city }}</h4>
                <img class="img-fluid" :src="store.methods.changeImg(city.data.daily.weather_code[0])" alt="">
                <p>Max: {{city.data.daily.temperature_2m_max[0] }}°C  -  Min:{{ city.data.daily.temperature_2m_min[0] }}</p>
                <p>Wind Max Speed: {{ city.data.daily.wind_speed_10m_max[index] }} km/h</p>
                <button class="btn btn-outline-danger" @click="deleteFavorites(city)">Elimina</button>
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
            //riempie l'array con le città preferite all'avvio della pagina
            getFavorites() {
                this.store.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
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

             deleteFavorites(city) {

                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                console.log(favorites);
                

                // Filtra l'array per escludere la città che vogliamo rimuovere
                favorites = favorites.filter(item => item.name !== city.city);

                // Aggiorna `localStorage` con l'array modificato
                localStorage.setItem('favorites', JSON.stringify(favorites));

                // Aggiorna anche lo store con l'array modificato
                this.store.favorites = favorites;

                // Filtra l'array di oggetti per escludere la city che vogliamo rimuovere e mostra dinamicamente il cambiamento
                this.data_weater = this.data_weater.filter(weatherItem => weatherItem.city !== city.city);

               

                // Mostra un messaggio per confermare la rimozione
                alert(`${city.city} è stata rimossa dai preferiti.`);
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