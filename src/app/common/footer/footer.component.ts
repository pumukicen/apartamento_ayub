import { ReservaService } from './../../pages/reserva/reserva.service';
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
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
        this.isReservaOpened = this.router.url === '/reserva';
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
    const bottom =
      this.expand || this.showFooterDetails ? 0 : -this.detailsHeight;
    return !this.viewIsInit ? '-100%' : `${bottom}px !important`;
  }

  get footerHeight(): number {
    return this.bookHeight + this.detailsHeight;
  }

  get dateLlegada(): Date {
    return this.form.get('llegada')?.value;
  }

  get dateSalida(): Date {
    return this.form.get('salida')?.value;
  }

  reservar(): void {
    this.router.navigate(['/reserva']);
  }
}
