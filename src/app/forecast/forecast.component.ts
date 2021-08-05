import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../service/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  data: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.currentForecastData.subscribe(data => this.data = data);
  }

}
