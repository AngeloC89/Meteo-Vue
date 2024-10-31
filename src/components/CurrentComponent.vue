<template>
    <section id="show-info" class="row mx-auto">
        <div v-if="store.city.name" class="d-flex flex-column justify-content-center align-items-center">
            <!-- shows the city and the current climate -->
            <h1 class="text-center">{{ store.city.name }}</h1>
            <div>
                <p class="text-center">Temperatura: {{ store.climate?.current?.temperature_2m }} °C</p>
                <p class="text-center">Umidità: {{ store.climate?.current?.relative_humidity_2m }} %</p>
            </div>

            <div>
                <!-- this button add the city to favorites  -->
                 <button class="m-auto" @click="addToFavorites(store.city)">Aggiungi ai preferiti</button>
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
                    //add cty to favorites
                    this.store.favorites.push(city);
                    //save the array in local storage
                    localStorage.setItem('favorites', JSON.stringify(this.store.favorites));
                    console.log(this.store.favorites);
                    alert(`${city.name} è stata aggiunta ai preferiti!`);
                } else {
                    alert(`${city.name} è già tra i preferiti.`);
                }
            }        
        },     
    }
</script>

<style lang="scss" scoped>

    // section for show the city
    #show-info {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;


    }
</style>