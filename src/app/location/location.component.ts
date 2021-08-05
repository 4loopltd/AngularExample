import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../service/weather.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  city: string;
  error: string;

  constructor(private weatherService: WeatherService) {
    this.city = '';
    this.error = '';
  }

  ngOnInit() {
    if (navigator.geolocation) {
      // does not return if off line
      navigator.geolocation.getCurrentPosition(position => {
        this.weatherService.loadCoordinate(position.coords);
      }, error => {
        this.error = error.message;
        this.weatherService.loadName('London');
      }, {timeout: 15000});
    } else {
      console.error('The browser does not support geolocation...');
    }

    this.weatherService.currentCity.subscribe(data => this.city = data);
    this.weatherService.currentError.subscribe(data => this.error = data);

  }

  submit(formData) {
    this.error = '';
    this.weatherService.loadName(formData.city);
  }

}
