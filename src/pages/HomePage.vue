<template>
    <div id="home" class="container">
        <!-- section for search the city -->
        <section class="d-flex align-items-center justify-content-end">
            <div id="search">
                <input type="search">
                <button>Search</button>
            </div>
        </section>
        <!-- section for show the city -->


    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    #home {
        width: 100%;
        height: 100vh;
        background-color: rgb(168, 165, 165);

        #search {
            width: 500px;
            height: 200px;
            display: flex;
            justify-content: end;
            align-items: center;

            input {
                width: 300px;
                height: 40px;
                font-size: 20px;
                margin-right: 15px;
            }

            button {
                width: 100px;
                height: 40px;
                font-size: 20px;
            }
        }

    }
</style>