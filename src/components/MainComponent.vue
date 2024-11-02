<template>
    <main>
        <LoaderComponent id="loader" :class="{ 'd-none': !store.loading }" />

        <RouterView :class="{ 'd-none': store.loading }" />


    </main>

</template>

<script>
    import { store } from '../store.js';
    import LoaderComponent from './LoaderComponent.vue';
    export default {
        name: 'MainComponent',
        components: {
            LoaderComponent,
        },
        data() {
            return {
                store
            }
        }
    }
</script>

<style lang="scss" scoped>
    main {
        height: 100%;
        width: 100%;
        overflow: hidden;
        

        #loader {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }

</style>