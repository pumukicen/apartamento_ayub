import { Component, OnInit } from '@angular/core';

export interface Servicio {
  title: string;
  logo: string;
  text: string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [
    {
      title: 'servicios_wifi_title',
      logo: 'wifi',
      text: 'servicios_wifi_text',
    },
    {
      title: 'servicios_cocina_title',
      logo: 'cocina',
      text: 'servicios_cocina_text',
    },
    {
      title: 'servicios_bano_title',
      logo: 'baño',
      text: 'servicios_bano_text',
    },
    {
      title: 'servicios_calef_title',
      logo: 'calefaccion',
      text: 'servicios_calef_text',
    },
    {
      title: 'servicios_bebe_title',
      logo: 'bebe',
      text: 'servicios_calef_text',
    },
    {
      title: 'servicios_parkin_title',
      logo: 'parking',
      text: 'servicios_calef_text',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
