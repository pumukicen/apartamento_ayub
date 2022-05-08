import { Component, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  showFooterDetails: boolean;
  // model: NgbDateStruct;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const html = document.querySelector('html');
    const page = document.querySelector('.page-content') as HTMLElement;
    this.renderer.listen(document, 'scroll', () => {
      this.showFooterDetails =
        (html?.scrollTop || 0) + screen.height + 30 >= page?.scrollHeight;
    });
  }
}
