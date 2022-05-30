import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/common/cards/cards.component';

@Component({
  selector: 'app-entorno',
  templateUrl: './entorno.component.html',
  styleUrls: ['./entorno.component.scss'],
})
export class EntornoComponent {
  cards: Card[] = [
    { title: 'env_1_name', text: 'env_1_text', img: 'gallocanta.jpg' },
    { title: 'env_2_name', text: 'env_2_text', img: 'senderismo.jpg' },
    { title: 'env_3_name', text: 'env_3_text', img: 'monasterio.jpg' },
    { title: 'env_4_name', text: 'env_4_text', img: 'balneario.jpg' },
  ];
}
