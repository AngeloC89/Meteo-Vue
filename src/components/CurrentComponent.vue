<template>
    <section id="show-info" class="row mx-auto">
        <div v-if="store.city.name" class="d-flex flex-column justify-content-center align-items-center">
            <!-- shows the city and the current climate -->
            <div class="d-flex align-items-center">
                <h1 class="text-center">{{ store.city.name }}</h1>
                <span @click="toggleStar(store.city)" class="btn d-flex justify-content-center ms-3 m-0 p-0 border-0">
                    <i class="m-0 p-0" :class="['fa-star', this.store.city.isFavorite_flag ? 'fa-solid' : 'fa-regular']"
                        :title="this.store.city.isFavorite_flag ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'"></i>
                </span>
            </div>

            <div class="d-flex gap-5">
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
                store,


            }
        },
        methods: {
            addToFavorites(city) {
                // Recupera i preferiti attuali, o inizializza con un array vuoto se non esiste.
                this.store.favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                // check if the city is already in favorites
                const CitySaved = this.store.favorites.some(
                    (item) => item.lat === city.lat && item.lon === city.lon
                );

                if (!CitySaved) {
                    this.store.city.isFavorite_flag = true;
                    //add cty to favorites
                    this.store.favorites.push(city);
                    //save the array in local storage
                    localStorage.setItem('favorites', JSON.stringify(this.store.favorites));
                    console.log(this.store.favorites);
                    alert(`${city.name} è stato aggiunto ai preferiti.`);
                } else {
                    alert(`${city.name} è già tra i preferiti.`);
                }
            },

            toggleStar(city) {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const foundCity = favorites.find(fav => fav.name === city.name && fav.isFavorite_flag === true);

                if (foundCity) {
                  this.store.methods.deleteFavorites(foundCity);
                } else {
                  this.addToFavorites(city);
                }
            }
            

        },

        mounted() {


        },
    }
</script>

<style lang="scss" scoped>

    // section for show the city
    #show-info {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            cursor: pointer;
            font-size: 25px;
            margin-left: 10px;
            color: gold;
            text-shadow: 1px 1px black;
        }

    }
</style>