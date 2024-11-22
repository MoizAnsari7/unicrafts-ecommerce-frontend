import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css'],
})
export class AddressDialogComponent {
  address: any = {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  };
  mode: 'add' | 'edit';

  constructor(
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    if (data.mode === 'edit') {
      this.address = { ...data.address };
    }
  }

  save(): void {
    this.dialogRef.close(this.address);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
