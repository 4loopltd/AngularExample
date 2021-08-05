import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../service/weather.service';

@Component({
  selector: 'app-astronomy',
  templateUrl: './astronomy.component.html',
  styleUrls: ['./astronomy.component.css']
})
export class AstronomyComponent implements OnInit {
  data: any;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.currentAstronomyData.subscribe(data => this.data = data);
  }

}
