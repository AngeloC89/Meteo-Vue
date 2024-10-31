import { reactive } from "vue";

//funzione per la data odierna in formato yyyy-mm-dd
function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function getEndDate(startDate) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 2); // Aggiungi 2 giorni
  return endDate.toISOString().split("T")[0];
}

export const store = reactive({
  apiBaseSearch: "https://geocoding-api.open-meteo.com/v1/search",
  apiBaseClimate: "https://api.open-meteo.com/v1/forecast",
  //devo creare due variabili per recuperare prima i dati dalla ricerca...
  //ad esempio longit e latid... e poi usarli per costruire url di climate.
  city: {},
  climate: [],
  favorites: [],

  options_city: {
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
      current:"temperature_2m,relative_humidity_2m",
      minutely: "60",
      hourly: "temperature_2m",
      daily:"temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code",
    },
  },

});
