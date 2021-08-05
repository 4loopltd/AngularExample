import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_KEY = 'INSERT_YOUR_KEY_HERE';
  private REPORT = 'weather.ls.hereapi.com/weather/1.0/report.json';
  private PRODUCT_FORECAST = 'forecast_7days_simple';
  private PRODUCT_ASTONOMY = 'forecast_astronomy';

  private city = new BehaviorSubject<string>('');
  currentCity = this.city.asObservable();

  private forecastData = new BehaviorSubject<any>({});
  currentForecastData = this.forecastData.asObservable();

  private astronomyData = new BehaviorSubject<any>({});
  currentAstronomyData = this.astronomyData.asObservable();

  private error = new BehaviorSubject<string>('');
  currentError = this.error.asObservable();

  constructor(private http: HttpClient) { }

  public loadName(name: string) {
    const url = 'https://' + this.REPORT + '?apiKey=' + this.API_KEY + '' +
      '&name=' + name +
      '&product=';

    this.getWeatherForecastData(url + this.PRODUCT_FORECAST );
    this.getWeatherAstronomyData(url + this.PRODUCT_ASTONOMY );
  }

  public loadCoordinate(coordinates: any) {
    const url = 'https://' + this.REPORT + '?apiKey=' + this.API_KEY +
      '&latitude=' + coordinates.latitude + '&longitude=' + coordinates.longitude +
      '&product=';
    this.getWeatherForecastData(url + this.PRODUCT_FORECAST );
    this.getWeatherAstronomyData(url + this.PRODUCT_ASTONOMY );
  }

  private getWeatherForecastData(url: string) {
    console.log('url: ' + url);

    this.http.jsonp(url, 'jsonpCallback')
      .pipe(map(result => (result as any)))
      .subscribe(result => {
        console.log(result);

        if (result.dailyForecasts) {
          this.forecastData.next(result);
          this.city.next(result.dailyForecasts.forecastLocation.city + ', ' + result.dailyForecasts.forecastLocation.country);
        } else {
          this.error.next(result.Type);
        }
      }, error => {
        console.error(error);
      });
  }

  private getWeatherAstronomyData(url: string) {
    console.log('url: ' + url);

    this.http.jsonp(url, 'jsonpCallback')
      .pipe(map(result => (result as any).astronomy))
      .subscribe(result => {
        console.log(result);

        if (result.astronomy) {
          this.astronomyData.next(result.astronomy[0]);
        }
      }, error => {
        console.error(error);
      });
  }

}
