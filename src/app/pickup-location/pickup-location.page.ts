import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage implements OnInit {
  map: Map;
  newMarker: any;
  address: string[];
  xlocation: number;
  ylocation: number;

  constructor(private activateRouter: ActivatedRoute) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.xlocation = parseFloat(
      this.activateRouter.snapshot.paramMap.get('xlocation')
    );
    this.ylocation = parseFloat(
      this.activateRouter.snapshot.paramMap.get('ylocation')
    );

    this.loadMap();
  }
  // The below function is added
  loadMap() {
    this.map = new Map('mapId', {
      scrollWheelZoom: false,
    }).setView([this.xlocation, this.ylocation], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map); // This line is added to add the Tile Layer to our map
  }

  locatePosition() {
    this.map.locate({ setView: true }).on('locationfound', (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable: true,
      }).addTo(this.map);
      this.newMarker.bindPopup('You are located here!').openPopup();

      this.newMarker.on('dragend', () => {
        const position = this.newMarker.getLatLng();
      });
    });
  }
}
