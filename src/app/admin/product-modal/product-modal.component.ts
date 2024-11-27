import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit, OnChanges {
  @Input() product: any = null; // The product being edited or added
  @Input() mode: 'add' | 'edit' = 'add'; // The mode: 'add' or 'edit'
  @Input() visible: boolean = false; // Controls modal visibility

  @Output() onSave: EventEmitter<any> = new EventEmitter(); // Emits when saving
  @Output() onClose: EventEmitter<void> = new EventEmitter(); // Emits when closing

  productForm!: FormGroup; // The reactive form

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reinitialize form when `product` input changes
    if (changes['product'] && changes['product'].currentValue) {
      this.initForm();
    }
  }

  // Initialize the reactive form
  initForm(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required]],
      description: [this.product?.description || ''],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      discount: [this.product?.discount || 0, [Validators.min(0), Validators.max(100)]],
      stock: [this.product?.stock || 0, [Validators.required, Validators.min(0)]],
      imageUrl: [this.product?.imageUrl || ''],
    });
  }

  // Save the product
  saveProduct(): void {
    if (this.productForm.valid) {
      this.onSave.emit(this.productForm.value);
      this.closeModal();
    }
  }

  // Close the modal
  closeModal(): void {
    this.onClose.emit();
  }
}
