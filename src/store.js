import { reactive } from "vue";
import axios from "axios";

function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function getEndDate(startDate) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 2); // Aggiungi 2 giorni
  return endDate.toISOString().split("T")[0];
}

//funzione per la data odierna in formato yyyy-mm-dd

export const store = reactive({
  apiBaseSearch: "https://geocoding-api.open-meteo.com/v1/search",
  apiBaseClimate: "https://api.open-meteo.com/v1/forecast",
  //devo creare due variabili per recuperare prima i dati dalla ricerca...
  //ad esempio longit e latid... e poi usarli per costruire url di climate.
  city: {},//coordinates of the city
  climate: [],//weater data
  date_time: new Date(),//date today
  favorites: [],
  temperatures: [],
  data_weater: [],
  loading: false,

  //endpoint
  options_city: {
    timeout: 5000,
    params: {
      name: "",
      count: 1, // Numero di risultati che vogliamo
      language: "it", // Imposta la lingua in italiano
      format: "json",
    },
  },

  options_climate: {
    params: {
      latitude: null,
      longitude: null,
      start_date: getCurrentDate(),
      end_date: getEndDate(getCurrentDate()),
      daily: "temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset",
      timezone: "auto",
      current: "temperature_2m,relative_humidity_2m",
      minutely: "60",
      hourly: "temperature_2m",
      daily:
        "temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code",
    },
  },

  methods: {
    changeImg(weathercode) {
      if (weathercode <= 20) {
        return "images/sole.png";
      } else if (weathercode > 20 && weathercode <= 40) {
        return "images/leggermente coperto.png";
      } else if (weathercode > 40 && weathercode <= 60) {
        return "images/coperto.png";
      } else if (weathercode > 60 && weathercode <= 80) {
        return "images/pioggia.png";
      } else {
        return "images/temporale.png";
      }
    },

    deleteFavorites(city) {

                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                console.log(favorites);

                store.city.isFavorite_flag = false;


                // Filtra l'array per escludere la città che vogliamo rimuovere
                favorites = favorites.filter(item => item.name !== city.name);

                // Aggiorna `localStorage` con l'array modificato
                localStorage.setItem('favorites', JSON.stringify(favorites));
                store.favorites = favorites;

                // Filtra l'array di oggetti per escludere la city che vogliamo rimuovere e mostra dinamicamente il cambiamento
                store.data_weater = store.data_weater.filter(weatherItem => weatherItem.name !== city.name);



                // Mostra un messaggio per confermare la rimozione
                alert(`${city.name} è stata rimossa dai preferiti.`);
            },
  
  },
});
