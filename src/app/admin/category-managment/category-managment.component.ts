import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../adminService/category.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-category-managment',
  templateUrl: './category-managment.component.html',
  styleUrls: ['./category-managment.component.css']
})
export class CategoryManagmentComponent implements OnInit {
  categories: any[] = [];
  categoryForm!: FormGroup;
  isEdit: boolean = false;
  selectedCategory: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notiflix: NotiflixService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategory();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;

      if (!this.isEdit) {
        // Add Category
        this.categoryService.addCategory(category).subscribe(
          (res: any) => {
            this.notiflix.success(res.message);
            this.getCategory();
            this.closeModal();
          },
          (err: any) => {
            this.notiflix.error(err.message);
          }
        );
      } else {
        // Update Category
        this.categoryService
          .updateCategory({ ...this.selectedCategory, ...category })
          .subscribe(
            (res: any) => {
              this.notiflix.success(res.message);
              this.getCategory();
              this.closeModal();
            },
            (err: any) => {
              this.notiflix.error(err.message);
            }
          );
      }
    }
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(
      (res: any) => {
        this.categories = res.categories;
        this.notiflix.success(res.message);
      },
      (err: any) => {
        this.notiflix.error(err.message);
      }
    );
  }

  openEditCategoryModal(category: any) {
    this.isEdit = true;
    this.selectedCategory = category;
    this.categoryForm.patchValue(category); // Populate form with category data
  }

  openAddCategoryModal() {
    this.isEdit = false;
    this.selectedCategory = null;
    this.categoryForm.reset(); // Reset the form for adding new category
  }

  deleteCategory(categoryId: any) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (res: any) => {
        this.notiflix.warning(res.message);
        this.getCategory();
      },
      (err: any) => {
        this.notiflix.error(err.message);
      }
    );
  }

  closeModal() {
    this.isEdit = false;
    this.categoryForm.reset();
    const modalElement = document.getElementById('categoryModal');
  if (modalElement) {
    const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
    modal.hide();
    modalElement.classList.remove('show');
    document.body.classList.remove('modal-open');
    this.cleanUpBackdrops();
  }
  }



  cleanUpBackdrops() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.remove());
  }
}
