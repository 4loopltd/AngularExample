import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  themeForm: FormGroup;
  enable = false;

  constructor(private fb: FormBuilder) {
    this.themeForm = this.fb.group({
      enable: false,
    });
  }

  onChange(enable: boolean) {
    this.enable = enable;

    if (enable) {
      this.setStyle('weather-app-theme', `assets/themes/purple-green.css`);
    } else {
      this.setStyle('weather-app-theme', `assets/themes/deeppurple-amber.css`);
    }
  }

  private setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${key}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(key);
  document.head.appendChild(linkEl);
  return linkEl;
}
