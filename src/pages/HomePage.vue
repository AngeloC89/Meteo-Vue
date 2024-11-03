<template>
    <div id="home" class="container">
        <!-- section for search the city -->
        <SearchBarComponent />

        <!-- current component -->
        <CurrentComponent />

        <!-- daily component -->
        <DailyComponent />

        <!-- charts component -->
        <ChartsComponent  />
    </div>
</template>

<script>
    import { store } from '../store.js';
    import axios from 'axios';
    import CurrentComponent from '@/components/CurrentComponent.vue';
    import DailyComponent from '@/components/DailyComponent.vue';
    import SearchBarComponent from '@/components/SearchBarComponent.vue';
    import ChartsComponent from '@/components/ChartsComponent.vue';
    export default {
        name: 'HomePage',
        components: {
            SearchBarComponent,
            CurrentComponent,
            DailyComponent,
            ChartsComponent,
        },

        data() {
            return {
                store,
            }
        },
    }
</script>

<style lang="scss" scoped>
    #home {
        width: 100%;
        height: 100%;
       // background-color: rgba(218, 218, 218, 0.418);
        padding: 20px;
        //border: 1px solid rgb(0, 0, 0);
        margin-top: 28px;


    }
</style>