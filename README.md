# Material Dialog Drag Bounds

This module provides a directive that prevents material dialog to be dragged beyond the viewport bounds.

## Installation

```
npm install @kovalenko/mat-dialog-drag-bounds
```

## Usage

First, import the MatDialogDragBoundsModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogDragBoundsModule} from '@kovalenko/mat-dialog-drag-bounds';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DialogComponent} from './app';

@NgModule({
  imports: [BrowserModule, MatDialogDragBoundsModule],
  declarations: [DialogComponent],
  bootstrap: [DialogComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(DialogComponent);
```

Then put all the directives inside the mat-dialog-header tag:
```typescript
import {Component} from '@angular/core';

@Component({
  template: `
  <div mat-dialog-title cdkDrag cdkDragRootElement=".cdk-overlay-pane" cdkDragHandle cdkDragBoundary=".cdk-global-overlay-wrapper" ngcMatDialogDragBounds>
    Dialog title
  </div>
  <mat-dialog-content>
    Dialog content
  </mat-dialog-content>
`
})
export class DialogComponent { }
```

## License

[MIT](LICENSE)
