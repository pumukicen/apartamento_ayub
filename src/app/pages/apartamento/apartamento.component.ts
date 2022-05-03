import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartamento',
  templateUrl: './apartamento.component.html',
  styleUrls: ['./apartamento.component.scss'],
})
export class ApartamentoComponent implements OnInit {
  position = {
    lat: 41.35281150296906,
    lng: -1.643361734010334,
  };

  constructor() {}

  ngOnInit(): void {}
}
