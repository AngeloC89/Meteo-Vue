<template>
    <header>
        <nav class="navbar navbar-expand-md bg-light" id="navbar">
            <div class="container-fluid">
                <h1 class="ms-3">Meteo-Vue</h1>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    @click="toggleBackdrop"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <div id="navbarLink" class="navbar-nav ms-auto d-flex gap-3 bg-light">
                        <div v-for="(link, index) in links" :key="index">
                            <router-link class="nav-link text-decoration-none" :to="link.url">
                                <h4 class="h5">{{ link.name }}</h4>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div id="backdrop" class="backdrop d-none"></div>
    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent',
        data() {
            return {
                links: [
                    {
                        name: 'Home',
                        url: '/'
                    },
                    {
                        name: 'Preferiti',
                        url: '/favorites'
                    }
                ],
            }
        },

        methods: {
            toggleBackdrop() {
                const backdrop = document.getElementById('backdrop');
                backdrop.classList.toggle('d-none');
            }
        }
    }

</script>

<style lang="scss" scoped>
    header {
        width: 100vw;
        height: 55px;

        position: fixed;

        nav{
            height: 100%;

        }

        .backdrop {
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 998; /* Assicurati che sia sotto la navbar ma sopra il resto */
        }
    }



    @media screen and (max-width: 768px) {
        #navbarLink {
            position: absolute;
            left: 0px;
            z-index: 1000;
            width: 100%;
            padding: 5px;
        }
        
    }
</style>