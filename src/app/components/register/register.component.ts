import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private notiflix : NotiflixService) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  // Custom cross-field validator for password matching
  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true }; // Add 'mismatch' error
    }
    return null; // No error
  }

  // Submit form data
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log("formData" , formData);
      this.userService.register(formData).subscribe((res:any)=>{
        console.log("ressss===", res);
        this.notiflix.success(res.message);
        this.router.navigate(['/login']); 
      })
    } else {
      this.notiflix.error('Please fill all fields correctly.');
      this.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }


  // Helper to mark all fields as touched to trigger validation errors
  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  // Getter methods for easier access to form controls
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
