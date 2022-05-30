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
      title: 'Wifi',
      logo: 'wifi',
      text: 'Podrás disfrutar de conexión WiFi en nuestro apartamento, es gratuito para todos nuestros clientes.',
    },
    {
      title: 'Cocina',
      logo: 'cocina',
      text: 'Totalmente equipada con todo lo necesario. Dispone de: batería de cocina, vajilla, cafetera, utensilios de cocina, lavavajillas, microondas, horno y material de limpieza.',
    },
    {
      title: 'Baño',
      logo: 'baño',
      text: 'Totalmente equipado con todo lo necesario. Entre otras cosas dispone de: toallas, jabón, champú y gel de baño y secador de pelo.',
    },
    {
      title: 'Calefacción',
      logo: 'calefaccion',
      text: 'Nuestro apartamento dispone de calefacción para que podáis disfrutar de una estancia agradable los días de invierno.',
    },
    {
      title: 'Bebes',
      logo: 'bebe',
      text: 'Tenemos cunas, tronas y juegos a tu disposición. Sin coste extra avisando al realizar la reserva.',
    },
    {
      title: 'Parking',
      logo: 'parking',
      text: 'El parking del casco histórico es de pago excepto fines de semana y festivos, pero a 100 metros hay disponible un aparacamiento libre y gratuito.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
