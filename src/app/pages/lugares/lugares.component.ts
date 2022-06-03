import { Component } from '@angular/core';
import { Card } from 'src/app/common/cards/cards.component';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
})
export class LugaresComponent {
  cards: Card[] = [
    { title: 'lugar_1_name', text: 'lugar_1_text', img: 'casco.jpg' },
    { title: 'lugar_2_name', text: 'lugar_2_text', img: 'castillo.jpg' },
    { title: 'lugar_3_name', text: 'lugar_3_text', img: 'juderia.png' },
    { title: 'lugar_4_name', text: 'lugar_4_text', img: 'bilbilis.jpg' },
  ];
}
