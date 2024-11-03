<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center">
            <h1 class="text-center">I tuoi preferiti</h1>
        </div>
        <div>
            <h3 class="text-center">aggiornato alle {{ this.clock }}</h3>
        </div>
        <div id="toggle">
            <button type="button" class="btn btn-outline-success" @click="toggleFavorites">{{ toggle ? 'Ordina per temperatura più bassa' : 'Ordina per temperatura più alta' }}
            </button>
        </div>
        <div class="d-flex align-items-center justify-content-center" v-for="(city, index) in data_weater" :key="index">
            <div id="favorites" class="d-flex flex-column flex-md-row h-100 p-3 gap-3 gap-md-0 my-3 my-md-1">
                <!--data_weater contains current, daily and hourly weather data. Using the current data dynamically we will always get up to date data -->
                <h4 id="city" class="text-center text-md-start">{{ city.city }}</h4>
                <div id="img">
                    <img class="img-fluid" :src="store.methods.changeImg(city.data.daily.weather_code[0])" alt="">
                </div>
                <p><i class="fa-solid fa-temperature-low fs-2"></i> {{ city.data.current.temperature_2m }} C°</p>
                <p>Max Wind: {{ city.data.daily.wind_speed_10m_max[0] }} km/h</p>
                <p>Humidity: {{ city.data.current.relative_humidity_2m }} %</p>
                <button id="delete" class="btn btn-outline-danger rounded-circle" @click="deleteFavorites(city)"><i
                        class="fa-solid fa-circle-xmark fs-3"></i></button>
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
                data_weater: [],
                toggle: false,
                clock: null,
                
            }
        },

        methods: {
            //riempie l'array con le città preferite all'avvio della pagina
            async getFavorites() {
                this.store.loading = true;
                this.store.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                this.data_weater = [];


                // Crea un array di Promesse per tutte le chiamate API
                const weatherPromises = this.store.favorites.map((favorite) => {
                    this.store.options_climate.params.latitude = favorite.lat;
                    this.store.options_climate.params.longitude = favorite.lon;

                    // Restituisci la promessa di axios
                    return axios.get(this.store.apiBaseClimate, this.store.options_climate)
                        .then((response) => {
                            return {
                                city: favorite.name,
                                data: response.data
                            };
                        });
                });

                // Aspetta che tutte le promesse siano risolte
                try {
                    const results = await Promise.all(weatherPromises);
                    this.data_weater = results; // Riempie data_weater con i risultati
                } catch (error) {
                    console.error("Errore nel recupero dei dati meteo: ", error);
                } finally {
                    this.store.loading = false;
                }

                this.sortFavorites();
                //debug
                console.log(this.data_weater);
            },

            sortFavorites() {
                // Ordina l'array in base alla temperatura 
                this.data_weater.sort((a, b) => {
                    const tempA = a.data.daily.temperature_2m_max[0];
                    const tempB = b.data.daily.temperature_2m_max[0];
                    return this.toggle ? tempB - tempA : tempA - tempB;
                });
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

            toggleFavorites() {
                this.toggle = !this.toggle;
                localStorage.setItem('toggle', JSON.stringify(this.toggle)); // Salva lo stato in localStorage
                this.sortFavorites();
            },
        },
        mounted() {
            this.toggle = JSON.parse(localStorage.getItem('toggle'));
            this.clock = this.store.date_time.toLocaleTimeString('it-IT', {
                hour: '2-digit', minute: '2-digit'});  
             
            this.sortFavorites();
            this.getFavorites();

        },
    }
</script>


<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        margin-top: 50px;




        #toggle {
            width: 100%;
            height: 50px;
            margin: 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #favorites {
            width: 90%;
            background-color: rgb(222, 222, 222);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
            border: 1px solid black;
            border-radius: 30px;


            #city {
                width: 130px;
                
            }

            #img {
                width: 60px;
                margin: 0 30px;

                img {
                    width: 60px;
                }
            }

            p {
                margin: 0 30px;

                i {
                    background: linear-gradient(180deg, #ff0000, #0051ff);
                    /* Colori del gradiente */
                    background-clip: text;
                    -webkit-background-clip: text;
                    /* Ritaglia il background per mostrare solo il testo */
                    color: transparent;
                    /* Rende il testo trasparente */
                    display: inline-block;
                    /* Necessario per il clipping */

                }

            }

            #delete {
                aspect-ratio: 1;
            }

        }

    }
</style>