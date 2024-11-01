<template>
    <main>
        <LoaderComponent id="loader" :class="{ 'd-none': store.loading }" />
        <div :class="{ 'd-none': !store.loading }">
            <RouterView />
        </div>

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
main{
height: 80%;
width: 100%;
position: absolute;
margin-top: 100px;


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