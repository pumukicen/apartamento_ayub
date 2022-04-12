import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  position = {
    lat: 41.35281150296906,
    lng: -1.643361734010334,
  };

  constructor() {}

  ngOnInit(): void {}
}
