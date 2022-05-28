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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NavigationEnd, Router } from '@angular/router';
import { addDays } from 'date-fns';

import { ReservaService } from './../../pages/reservar/reserva.service';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild('picker1') caledar1: MatDatepicker<any>;
  @ViewChild('picker2') caledar2: MatDatepicker<any>;
  @ViewChild('footerBook') footerBook: ElementRef;

  @ViewChild('footerDetails') footerDetails: ElementRef;
  isReservaOpened: boolean;
  showFooterDetails: boolean;
  expand: boolean;
  form: FormGroup;
  private viewIsInit = false;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private footerService: FooterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private reservaService: ReservaService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.footerService.setHeight(this.footerHeight);
        this.isReservaOpened = this.router.url === '/reservar';
        setTimeout(() => this.arrangeFooter());
      }
    });
    this.form = this.formBuilder.group({
      llegada: new FormControl(undefined),
      salida: new FormControl(undefined),
      adultos: new FormControl(0),
    });
    this.form
      .get('llegada')
      ?.valueChanges.subscribe(
        (value) => (this.reservaService.llegada = value)
      );
    this.form
      .get('salida')
      ?.valueChanges.subscribe((value) => (this.reservaService.salida = value));
    this.form
      .get('adultos')
      ?.valueChanges.subscribe(
        (value) => (this.reservaService.adultos = value)
      );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.footerService.setHeight(this.footerHeight);
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.listenScroll();
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.viewIsInit = true));
    (this.caledar1['_dateAdapter'] as NativeDateAdapter).getFirstDayOfWeek =
      () => 1;
    (this.caledar2['_dateAdapter'] as NativeDateAdapter).getFirstDayOfWeek =
      () => 1;
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
    const bottom =
      this.expand || this.showFooterDetails ? 0 : -this.detailsHeight;
    return !this.viewIsInit ? '-100%' : `${bottom}px !important`;
  }

  get footerHeight(): number {
    return this.bookHeight + this.detailsHeight;
  }
  get min(): Date {
    return this.dateLlegada || this.tomorrow;
  }
  get dateLlegada(): Date {
    return this.form.get('llegada')?.value;
  }

  get dateSalida(): Date {
    return this.form.get('salida')?.value;
  }
  get tomorrow(): Date {
    return addDays(new Date(), 1);
  }
  reservar(): void {
    this.router.navigate(['/reservar']);
  }
  private listenScroll(): void {
    const html = document.querySelector('html');
    const page = document.querySelector('.page-content') as HTMLElement;
    this.renderer.listen(document, 'scroll', () => {
      this.showFooterDetails =
        (html?.scrollTop || 0) + screen.height > page?.scrollHeight;
    });
  }
  private arrangeFooter(): void {
    const page = document.querySelector('.page-content') as HTMLElement;
    if (page) page.scrollTo(0, 0);
    setTimeout(() => (this.showFooterDetails = false));
  }
}
