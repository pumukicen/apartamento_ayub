import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FooterService } from './footer.service';
// import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild('footerBook') footerBook: ElementRef;

  @ViewChild('footerDetails') footerDetails: ElementRef;
  // @ViewChild(NgbDatepicker) d: NgbDatepicker;
  // caca() {}
  showFooterDetails: boolean;
  private viewIsInit = false;

  // model: NgbDateStruct;
  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private footerService: FooterService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.footerService.setHeight(this.footerHeight);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.footerService.setHeight(this.footerHeight);
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    const html = document.querySelector('html');
    const page = document.querySelector('.page-content') as HTMLElement;
    this.renderer.listen(document, 'scroll', () => {
      this.showFooterDetails =
        (html?.scrollTop || 0) + screen.height >= page?.scrollHeight;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.viewIsInit = true));
  }
  get bookHeight(): number {
    return !this.footerBook ? 60 : this.footerBook.nativeElement.offsetHeight;
  }

  get detailsHeight(): number {
    return !this.footerDetails
      ? 0
      : this.footerDetails.nativeElement.offsetHeight;
  }

  get footerBottom(): string {
    const bottom = this.showFooterDetails ? 0 : -this.detailsHeight;
    return !this.viewIsInit ? '-100%' : `${bottom}px !important`;
  }

  get footerHeight(): number {
    return this.bookHeight + this.detailsHeight;
  }
}
