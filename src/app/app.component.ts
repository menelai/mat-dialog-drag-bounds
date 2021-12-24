import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
