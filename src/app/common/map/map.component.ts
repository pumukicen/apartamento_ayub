import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  private position = {
    lat: 41.35281150296906,
    lng: -1.643361734010334,
  };
  goMaps(): void {
    const link = `https://www.google.com/maps/search/?api=1&query=${this.position.lat},${this.position.lng}`;
    window.open(link);
  }
}
