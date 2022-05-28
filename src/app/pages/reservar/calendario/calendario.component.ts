import { Reserva } from './../reserva.model';
import { ReservaService } from './../reserva.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEvent, CalendarMonthViewComponent } from 'angular-calendar';
import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  startOfDay,
  subMonths,
} from 'date-fns';
import { FormatPipe } from 'ngx-date-fns';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [FormatPipe],
})
export class CalendarioComponent {
  @Input() nextBook: Date;
  @Input() since: Date;
  @Input() until: Date;
  @Input() calendarFor: 'since' | 'until';
  @Input() alertMsg: string;
  @Output() selectDate = new EventEmitter<Date>();
  viewDate = new Date();
  cell: CalendarMonthViewComponent;
  opened: boolean;
  constructor(private reservaService: ReservaService) {
    registerLocaleData(localeEs);
  }
  get events(): CalendarEvent[] {
    return this.reservaService.reservasList.map((reserva: Reserva) => {
      return {
        title: '',
        start: new Date(reserva.llegada as Date),
        end: new Date(reserva.salida as Date),
        allDay: true,
      };
    });
  }
  // = [
  //   {
  //     start: new Date(1656021600000),
  //     end: new Date(1656280799999),
  //     title: '',
  //     allDay: true,
  //   },
  //   {
  //     start: new Date(),
  //     end: addDays(new Date(), 4),
  //     title: '',
  //     allDay: true,
  //   },
  // ];
  currentMonth(): number {
    return 0;
  }
  moveMonth(offset: number, event: MouseEvent): void {
    event.stopPropagation();
    this.viewDate = addMonths(this.viewDate, offset);
  }
  noPrevious(date: Date): boolean {
    return (
      endOfMonth(subMonths(date, 1)) <= endOfMonth(subMonths(new Date(), 1))
    );
  }
  today(day: Date): boolean {
    return startOfDay(day).valueOf() == startOfDay(new Date()).valueOf();
  }
  past(day: Date): boolean {
    return day.valueOf() < startOfDay(new Date()).valueOf();
  }
  onSelectDate(day: Date): void {
    this.selectDate.emit(day);
  }
  isSince(day: Date): boolean {
    return (
      this.since &&
      startOfDay(day).valueOf() == startOfDay(this.since).valueOf()
    );
  }
  isUntil(day: Date): boolean {
    return (
      this.until && endOfDay(day).valueOf() == endOfDay(this.until).valueOf()
    );
  }
  isBook(day: Date): boolean {
    if (!this.since || !this.until) return false;
    return (
      day.valueOf() > this.since.valueOf() &&
      day.valueOf() < this.until.valueOf()
    );
  }
  isUnavailable(day: Date): boolean {
    if (this.since && this.until) return false;
    const beforeSince = this.since
      ? new Date(day).valueOf() < new Date(this.since).valueOf()
      : false;
    const afterNextBook = this.nextBook
      ? new Date(day).valueOf() >= new Date(this.nextBook).valueOf()
      : false;
    return beforeSince || afterNextBook;
  }
}
