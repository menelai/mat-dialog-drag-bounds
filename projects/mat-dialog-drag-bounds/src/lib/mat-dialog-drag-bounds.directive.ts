import {AfterViewInit, Directive, DoCheck, ElementRef, Input, NgZone} from '@angular/core';

@Directive({
  selector: '[cdkDrag][cdkDragHandle][cdkDragBoundary][ngcMatDialogDragBounds]'
})
export class MatDialogDragBoundsDirective implements AfterViewInit, DoCheck {
  @Input() set ngcMatDialogDragBounds(v: number | string) {
    if (typeof v === 'number' || !isNaN(parseInt(v))) {
      this.treshold = Number(v);
    }
  }

  private overlayWrapper?: HTMLElement;
  private dialog?: HTMLElement;
  private w?: number;
  private h?: number;
  private treshold = 16;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone
  ) { }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.overlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
      this.dialog = this.elementRef.nativeElement.closest('.cdk-overlay-pane');
      this.style();
    });
  }

  ngDoCheck() {
    if (this.dialog) {
      this.zone.runOutsideAngular(() => {
        const positionInfo = this.dialog!.getBoundingClientRect();
        if (this.h != null && (this.h !== Math.round(positionInfo.height) || this.w !== Math.round(positionInfo.width))) {
          this.style();
        }
      });
    }
  }

  private style(): void {
    const positionInfo = this.dialog!.getBoundingClientRect();
    const x = Math.round(positionInfo.width) - this.treshold;
    const y = Math.round(positionInfo.height) - this.treshold;
    this.overlayWrapper!.style.left = `-${x}px`;
    this.overlayWrapper!.style.paddingLeft = `${x}px`;
    this.overlayWrapper!.style.right = `-${x}px`;
    this.overlayWrapper!.style.paddingRight = `${x}px`;
    this.overlayWrapper!.style.bottom = `-${y}px`;
    this.overlayWrapper!.style.paddingBottom = `${y}px`;
    this.overlayWrapper!.style.width = `auto`;
    this.overlayWrapper!.style.height = `auto`;
    this.w = Math.round(positionInfo.width);
    this.h = Math.round(positionInfo.height);
  }

}
