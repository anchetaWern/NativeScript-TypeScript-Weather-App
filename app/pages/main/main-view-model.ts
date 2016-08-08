import observable = require("data/observable");
import requestor = require("../../common/requestor");
import constants = require("../../common/constants");
import geolocation = require("nativescript-geolocation");
import moment = require('moment');
import utilities = require('../../common/utilities');
import locationStore = require('../../stores/locationStore');

export class MainViewModel extends observable.Observable {

  constructor() {
    super();
    if (!geolocation.isEnabled()) {
      geolocation.enableLocationRequest();
    }

    var time_of_day = utilities.getTimeOfDay();
    this.set('background_class', time_of_day);
    this.setIcons();

    var location = geolocation.getCurrentLocation({timeout: 10000}).
    then(
      (loc) => {
        if (loc) {
          locationStore.saveLocation(loc);
          this.set('is_loading', true);

          var url = `${constants.WEATHER_URL}${constants.CURRENT_WEATHER_PATH}?lat=${loc.latitude}&lon=${loc.longitude}&apikey=${constants.WEATHER_APIKEY}`;
          requestor.get(url).then((res) => {
            this.set('is_loading', false);
            var weather = res.weather[0].main.toLowerCase();
            var weather_description = res.weather[0].description;

            var temperature = res.main.temp;
            var icon = constants.WEATHER_ICONS[time_of_day][weather];

            var rain = '0';
            if(res.rain){
                rain = res.rain['3h'];
            }

            this.set('icon', String.fromCharCode(icon));
            this.set('temperature', `${utilities.describeTemperature(Math.floor(temperature))} (${utilities.convertKelvinToCelsius(temperature).toFixed(2)} °C)`);
            this.set('weather', weather_description);
            this.set('place', `${res.name}, ${res.sys.country}`);
            this.set('wind', `${utilities.describeWindSpeed(res.wind.speed)} ${res.wind.speed}m/s ${utilities.degreeToDirection(res.wind.deg)} (${res.wind.deg}°)`);
            this.set('clouds', `${res.clouds.all}%`);
            this.set('pressure', `${res.main.pressure} hpa`);
            this.set('humidity', `${utilities.describeHumidity(res.main.humidity)} (${res.main.humidity}%)`);
            this.set('rain', `${rain}%`);
            this.set('sunrise', moment.unix(res.sys.sunrise).format('hh:mm a'));
            this.set('sunset', moment.unix(res.sys.sunset).format('hh:mm a'));
          });

        }
      },
      (e) => {
        alert(e.message);
      }
    );

  }

  setIcons() {
    var icons = utilities.getIcons([
      'temperature', 'wind', 'cloud',
      'pressure', 'humidity', 'rain',
      'sunrise', 'sunset'
    ]);
    icons.forEach((item) => {
      this.set(`${item.name}_icon`, item.icon);
    });
  }

}
