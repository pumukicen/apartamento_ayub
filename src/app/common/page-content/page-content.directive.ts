import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { FooterService } from './../footer/footer.service';

@Directive({
  selector: '[pageContent]',
})
export class PageContentDirective implements AfterViewInit, OnDestroy {
  constructor(
    private element: ElementRef,
    private footerService: FooterService,
    private renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    this.footerService.height.subscribe((value) =>
      this.renderer.setStyle(
        this.element.nativeElement,
        'padding-bottom',
        `${value}px`
      )
    );
  }
  ngOnDestroy(): void {}
}
