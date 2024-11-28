import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

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
    if (changes['product'] && changes['product'].currentValue) {
      this.initForm();
    }
  }

  // Initialize the reactive form
  initForm(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required]],
      description: [this.product?.description || ''],
      // category: [this.product?.category || '', [Validators.required]],
      // brand: [this.product?.brand || ''],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      discountPrice: [this.product?.discountPrice || 0],
      stock: [this.product?.stock || 0, [Validators.required, Validators.min(0)]],
      rating: [this.product?.rating || 0],
      imageUrl: [''], // Optional single image URL field
      images: this.fb.array(
        (this.product?.images || []).map((url:any) => this.fb.control(url))
      ), // Multiple images array
      attributes: this.fb.group({
        color: [this.product?.attributes?.color || ''],
        size: [this.product?.attributes?.size || ''],
      }),
    });
  }

  // Initialize images array
  initImages(images: string[]): FormControl[] {
    return images.map((url) => this.fb.control(url));
  }

  // Add a new image URL field
  addImage(): void {
    this.images.push(this.fb.control(''));
  }

  // Remove an image URL field
  removeImage(index: number): void {
    this.images.removeAt(index);
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

  // Getter for images FormArray
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
}
