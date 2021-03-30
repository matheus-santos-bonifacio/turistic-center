import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;

  constructor() {}

  ngOnInit() {
    fetch('./assets/data.json')
      .then((json) => json.json())
      .then((data) => {
        this.data = data;
      });
  }
}
