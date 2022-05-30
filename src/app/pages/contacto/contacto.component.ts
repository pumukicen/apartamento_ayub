import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent {
  private position = {
    lat: 41.35281150296906,
    lng: -1.643361734010334,
  };
  goMaps(): void {
    const link = `https://www.google.com/maps/search/?api=1&query=${this.position.lat},${this.position.lng}`;
    window.open(link);
  }
}
