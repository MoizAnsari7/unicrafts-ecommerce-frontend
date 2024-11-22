import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css'],
})
export class AddressDialogComponent {
  @Input() address: any = {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  };
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  save(): void {
    this.onSave.emit(this.address);
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
