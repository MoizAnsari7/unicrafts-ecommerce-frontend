import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit, OnChanges {
  @Input() product: any = null; // The product being edited or added
  @Input() mode: 'add' | 'edit' = 'add'; // The mode: 'add' or 'edit'
  @Input() visible: boolean = false; // Controls modal visibility
  @Input() categories: any[] = []; // List of categories for selection
  @Input() brands: any[] = []; // List of brands for selection

  @Output() onSave: EventEmitter<any> = new EventEmitter(); // Emits when saving
  @Output() onClose: EventEmitter<void> = new EventEmitter(); // Emits when closing

  productForm!: FormGroup; // Reactive form

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reinitialize form if product data changes
    if (changes['product'] && this.product) {
      this.initForm();
    }
  }

  // Initialize the reactive form
  initForm(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required]],
      description: [this.product?.description || ''],
      category: [this.product?.category || '', [Validators.required]],
      brand: [this.product?.brand || ''],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      discountPrice: [this.product?.discountPrice || 0],
      stock: [this.product?.stock || 0, [Validators.required, Validators.min(0)]],
      rating: [this.product?.rating || 0],
      imageUrl: [''], // Optional single image URL field
      images: this.fb.array(
        (this.product?.images || []).map((url: any) => this.fb.control(url, [Validators.required]))
      ), // Multiple images array
      attributes: this.fb.group({
        color: [this.product?.attributes?.color || ''],
        size: [this.product?.attributes?.size || ''],
      }),
    });
  }

  // Add a new image URL field
  addImage(): void {
    this.images.push(this.fb.control('', [Validators.required]));
  }

  // Remove an image URL field
  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  // Save the product
  saveProduct(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      // Emit save event with the form value
      this.onSave.emit({
        ...formValue,
        mode: this.mode, // Send mode to differentiate between add/edit
      });

      this.closeModal();
    }
  }

  // Close the modal
  closeModal(): void {
    this.onClose.emit();

    // Reset form on modal close
    this.productForm.reset();
    this.initForm(); // Reinitialize the form for next use
  }

  // Getter for images FormArray
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
}
