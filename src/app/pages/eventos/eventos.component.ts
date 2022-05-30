import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/common/cards/cards.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent {
  cards: Card[] = [
    { title: 'event_1_name', text: 'event_1_text', img: 'semanasanta.jpg' },
    { title: 'event_2_name', text: 'event_2_text', img: 'alfonsadas.jpg' },
    { title: 'event_3_name', text: 'event_3_text', img: 'roque.jpg' },
    { title: 'event_4_name', text: 'event_4_text', img: 'peña2.jpg' },
  ];
}
