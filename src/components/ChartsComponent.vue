<template>
  <div id="chart">
    <h5 v-if="store.temperatures.length > 0" >Andamento delle Temperature in 24 Ore</h5>
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
        labels: Array.from({ length: 25 }, (_, i) => `${i}:00`), // Etichette per le ore
        chart: null,

      };
    },

    async mounted() {
      // Renderizza il grafico se ci sono dati disponibili
      if (this.store.temperatures && this.store.temperatures.length > 0) {
        this.renderChart();
      }
    },

    methods: {


      renderChart() {
        // Controlla se il canvas è disponibile
        const canvas = document.getElementById('temperatureChart');
        if (!canvas) {
          console.warn("Canvas non trovato. Il grafico non può essere renderizzato.");
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Controlla se il contesto è valido
        if (!ctx) {
          console.warn("Elemento canvas non trovato.");
          return;
        }

        // Distruggi l'istanza precedente del grafico se esiste
        if (this.chart) {
          this.chart.destroy();
        }

        // Crea un nuovo grafico
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.labels, // Assicurati che labels contenga 24 valori
            datasets: [{
              label: 'Temperatura (°C)',
              data: this.store.temperatures, // Assicurati che temperatures contenga 24 valori
              fill: false,
              borderColor: 'rgb(0, 0, 0)', // Colore della linea
              tension: 0.5, // Tensione per la curvatura della linea
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
                  text: 'Temperatura (°C)', // Titolo dell'asse Y
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Ora', // Titolo dell'asse X
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
          if (newVal.length > 0) { // Controlla che ci siano dati
            this.renderChart(); // Esegui il rendering solo se ci sono dati
          }
        },
        immediate: true, // Esegui il watcher anche al caricamento iniziale
      },
    },

    // Distruggi il grafico quando il componente viene smontato
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();//destroy the instance of the chart
        this.chart = null; // Rimuove il riferimento al grafico
      }
    },

  };

</script>


<style scoped lang="scss">
  #chart {
    max-width: 900px;
    margin: 20px auto;
    text-align: center;
    background-color: rgb(168, 165, 165);
  }

  canvas {
    max-width: 100%;
    height: 500px;
  }
</style>