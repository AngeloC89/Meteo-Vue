<template>
  <div id="chart">
    <h5 v-if="store.temperatures.length > 0">Andamento delle Temperature in 24 Ore</h5>
    <canvas id="temperatureChart"></canvas>
  </div>
</template>

<script>
  import { Chart, registerables } from 'chart.js';
  import axios from 'axios';
  import { store } from '../store.js';

  Chart.register(...registerables);

  export default {
    name: 'ChartsComponent',
    data() {
      return {
        store,
        temperatures: [],
        labels: Array.from({ length: 25 }, (_, i) => `${i}:00`),
        chart: null,

      };
    },

    async mounted() {
      // render the chart when the component is mounted
      if (this.store.temperatures && this.store.temperatures.length > 0) {
        this.renderChart();
      }
    },

    methods: {


      renderChart() {
        // check if the canvas exists
        const canvas = document.getElementById('temperatureChart');
        if (!canvas) {
          console.warn("Canvas non trovato. Il grafico non può essere renderizzato.");
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // check if the chart already exists
        if (!ctx) {
          console.warn("Elemento canvas non trovato.");
          return;
        }

        // destroy the chart if it already exists
        if (this.chart) {
          this.chart.destroy();
        }

        // create the chart
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [{
              label: 'Temperatura (°C)',
              data: this.store.temperatures,
              fill: false,
              borderColor: 'rgb(0, 0, 0)',
              tension: 0.5,
            }],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: 25,
                ticks: {
                  stepSize: 1,
                },
                title: {
                  display: true,
                  text: 'Temperatura (°C)',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Ora',
                },
              },
            },
          },
        });
      }
    },

    watch: {
      'store.temperatures': {
        handler(newVal) {
          if (newVal.length > 0) {
            this.renderChart(); // render the chart
          }
        },
        immediate: true, // render the chart immediately
      },
    },

    // destroy the chart when the component is unmounted
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();//destroy the instance of the chart
        this.chart = null; // remove the reference to the chart
      }
    },

  };

</script>


<style scoped lang="scss">
  #chart {
    max-width: 900px;
    margin: 20px auto;
    text-align: center;
    background-color: rgba(218, 218, 218, 0.117);
  }

  canvas {
    max-width: 100%;
    height: 500px;
  }
</style>