<template>
    <div id="home" class="container">
        <!-- section for search the city -->
        <SearchBarComponent />

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
import SearchBarComponent from '@/components/SearchBarComponent.vue';
    export default {
        name: 'HomePage',
        components: {
            SearchBarComponent,
            CurrentComponent,
            DailyComponent
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
        height: 100vh;
        background-color: rgb(168, 165, 165);

    }
</style>