<template>
    <header>
        <nav class="navbar navbar-expand-md bg-light">
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
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <div class="navbar-nav ms-auto d-flex gap-3">
                        <div v-for="(link, index) in links" :key="index">
                            <router-link class="nav-link text-decoration-none" :to="link.url">
                                <h4 class="h5">{{ link.name }}</h4>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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
    }
</style>