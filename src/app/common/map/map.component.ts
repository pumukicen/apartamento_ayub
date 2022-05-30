import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  private position = {
    lat: 41.3526539,
    lng: -1.6433065,
  };
  goMaps(): void {
    const link = `https://www.google.com/maps/search/?api=1&query=${this.position.lat},${this.position.lng}`;
    window.open(link);
  }
}
