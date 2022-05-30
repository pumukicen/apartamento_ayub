import { Component, OnInit } from '@angular/core';

export interface Restaurante {
  name: string;
  text: string;
  img: string;
  link: string;
}
@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss'],
})
export class RestaurantesComponent {
  restaurantes: Restaurante[] = [
    {
      name: 'Restaurante Puerta Terrer',
      text: 'restaurante_1_text',
      img: 'pterrer.jpg',
      link: 'https://restaurantepuertadeterrer.com/',
    },
    {
      name: 'Restaurante Fonduq El Pilar',
      text: 'restaurante_2_text',
      img: 'fonduq.jpg',
      link: 'https://fonduqhoteles.com/restaurantes/hotel-el-pilar/',
    },
    {
      name: 'Restaurante Posada San Antón',
      text: 'restaurante_3_text',
      img: 'sanAnton.jpg',
      link: 'https://posadasananton.es/',
    },
    {
      name: 'Restaurante La Perla',
      text: 'restaurante_4_text',
      img: 'perla.jpg',
      link: 'https://www.tripadvisor.es/Restaurant_Review-g675038-d4715083-Reviews-La_Perla-Calatayud_Province_of_Zaragoza_Aragon.html',
    },
  ];

  restauranteImg(restaurante: Restaurante): string {
    return `url("./assets/img/${restaurante.img}")`;
  }
}
