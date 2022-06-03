import { Component, Input } from '@angular/core';

export interface Card {
  title: string;
  text: string;
  img: string;
}
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() cards: Card[] = [];

  getImg(card: Card): string {
    return `url("./assets/img/${card.img}")`;
  }
}
