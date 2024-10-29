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

        <section id="show-info">
            <table class="table-info">
                <thead>
                    <tr class="table-info">
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="table-info">
                      <th scope="row">1</th>
                      <td class="table-info">...</td>
                      <td class="table-info">...</td>
                      <td class="table-info">...</td>
                    </tr>
                    <tr class="table-info">
                      <th scope="row">2</th>
                      <td class="table-info">...</td>
                      <td class="table-info">...</td>
                      <td class="table-info">...</td>
                    </tr>
                    <tr class="table-info">
                      <th scope="row">3</th>
                      <td class="table-info">...</td>
                      <td class="table-info">...</td>
                      <td class="table-info">...</td>
                    </tr>
                  </tbody>
            </table>
        </section>


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


        // section for search the city
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

        // section for show the city
        #show-info {
            width: 100%;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;

            table{
                width: 100%;
                height: 100%;
            }
        }

    }
</style>