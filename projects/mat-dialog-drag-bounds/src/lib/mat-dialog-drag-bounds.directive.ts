import {AfterViewInit, Directive, DoCheck, ElementRef, Input, NgZone} from '@angular/core';

@Directive({
  selector: '[cdkDrag][cdkDragHandle][cdkDragBoundary][ngcMatDialogDragBounds]'
})
export class MatDialogDragBoundsDirective implements AfterViewInit, DoCheck {
  @Input() ngcMatDialogDragBounds = 16;

  private overlayWrapper?: HTMLElement;
  private dialog?: HTMLElement;
  private w?: number;
  private h?: number;

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
    const x = Math.round(positionInfo.width) - this.ngcMatDialogDragBounds;
    const y = Math.round(positionInfo.height) - this.ngcMatDialogDragBounds;
    this.overlayWrapper!.style.left = `-${x}px`;
    this.overlayWrapper!.style.right = `-${x}px`;
    this.overlayWrapper!.style.bottom = `-${y}px`;
    this.overlayWrapper!.style.paddingBottom = `${y}px`;
    this.overlayWrapper!.style.width = `auto`;
    this.overlayWrapper!.style.height = `auto`;
    this.w = Math.round(positionInfo.width);
    this.h = Math.round(positionInfo.height);
  }

}
