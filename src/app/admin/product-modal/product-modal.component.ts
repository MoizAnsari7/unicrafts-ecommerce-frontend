import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NotiflixService } from 'src/app/services/notiflix.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit, OnDestroy {
  @Input() product: any = null; // Product being edited or added
  @Input() mode: 'add' | 'edit' = 'add'; // Mode: 'add' or 'edit'
  @Input() visible: boolean = false; // Modal visibility state
  @Input() categories: any[] = []; // Categories for dropdown

  @Output() onSave: EventEmitter<any> = new EventEmitter(); // Emits on save
  @Output() onClose: EventEmitter<void> = new EventEmitter(); // Emits on close

  productForm!: FormGroup; // Form group for product
  images!: FormArray; // Form array for images

  constructor(private fb: FormBuilder, private notiflixService: NotiflixService) {}

  ngOnInit(): void {
    this.initForm();   
    this.productForm.patchValue({
      category : "Jeans"
    }) 
  }
  




  // Initialize the form
  initForm(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required]],
      description: [this.product?.description || '', Validators.required],
      category: [this.product?.category , Validators.required], // Category binding
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      discountPrice: [this.product?.discountPrice || 0],
      stock: [this.product?.stock || 0, [Validators.required, Validators.min(0)]],
      images: this.fb.array([]),
      attributes: this.fb.group({
        color: [this.product?.attributes?.color || ''],
        size: [this.product?.attributes?.size || ''],
      }),
    });

    this.images = this.productForm.get('images') as FormArray;
  }




  // Add an image field
  addImage(): void {
    this.images.push(this.fb.control(null, Validators.required));
  }

  // Handle image input change
  handleImageInput(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.images.at(index).setValue(fileInput.files[0]);
    }
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }
  saveProduct(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const productData = this.productForm.value;
  
      // Append text fields
      formData.append('name', productData.name);
      formData.append('price', productData.price.toString()); // Ensure it's a string
      formData.append('stock', productData.stock.toString()); // Ensure it's a string
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('discountPrice', productData.discountPrice.toString()); // Optional
      formData.append('attributes', JSON.stringify(productData.attributes)); // Convert attributes to a string
  
      // Append images
      productData.images.forEach((file: File) => {
        console.log('Appending file:', file.name); // Debugging log
        formData.append('images', file);
      });
  
      // Emit the form data for submission
      this.onSave.emit(formData);
    } else {
      console.error('Form is invalid'); // Add error handling
    }
  }
  

  // Close modal
  closeModal(): void {
    this.onClose.emit();
    this.productForm.reset();
    this.initForm(); // Reinitialize form after closing
  }

  ngOnDestroy(): void {
    this.productForm.reset();
  }
}
