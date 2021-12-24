# MaterialDialogDragBounds

Prevents material dialog to be dragged away from the window

## Installation

```
npm install @kovalenko/mat-dialog-drag-bounds
```

### Directive

Selector: `[ngcMatDialogDragBounds]`

#### Properties

Name | Description
--- | ---
`@Input() ngcMatDialogDragBounds: number` | Drag threshold in pixels (default 16)


## Usage

First, import the MaterialConfirmModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogDragBoundsModule} from '@kovalenko/mat-dialog-drag-bounds';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    MatDialogDragBoundsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Then enable material dialog dragging:

`cdkDragRootElement` must be `.cdk-overlay-pane` and `cdkDragBoundary` must be `.cdk-global-overlay-wrapper`

```typescript
import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  template: `
  <a (click)="launchDialog()">Launch Dialog</a>

<ng-template #dialogTpl>
  <div 
    mat-dialog-title 
    cdkDrag 
    cdkDragRootElement=".cdk-overlay-pane" 
    cdkDragHandle 
    cdkDragBoundary=".cdk-global-overlay-wrapper"
    ngcMatDialogDragBounds
  >Drag me</div>
  <mat-dialog-content>
    Text
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button (click)="close()" mat-button type="button">Close</button>
  </mat-dialog-actions>
</ng-template>
  
  `,
})
export class AppComponent {
  @ViewChild('dialogTpl', {static: true}) dialogTpl!: TemplateRef<any>;

  private dialogInstance?: MatDialogRef<any, any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  launchDialog(): void {
    this.dialogInstance = this.dialog.open(this.dialogTpl, {
      width: '600px',
      position: {top: '10px'},
    });
  }

  close(): void {
    this.dialogInstance?.close();
  }
}

```

## License

MIT
