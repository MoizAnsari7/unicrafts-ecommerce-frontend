import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup; // Reactive form group
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (profile) => {
        this.profileForm.patchValue({
          username: profile.username,
          email: profile.email,
        });
      },
      (error) => {
        console.error('Error loading profile:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadProfilePicture(): void {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile);

    this.userService.uploadProfilePicture(formData).subscribe(
      () => {
        alert('Profile picture uploaded successfully!');
        this.loadUserProfile();
      },
      (error) => {
        console.error('Error uploading profile picture:', error);
      }
    );
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.userService.updateUserProfile(this.profileForm.value).subscribe(
      () => {
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
