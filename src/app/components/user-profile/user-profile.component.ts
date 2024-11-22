import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfile: any = {
    username: '',
    email: '',
  };

  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
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
    this.userService.updateUserProfile(this.userProfile).subscribe(
      () => {
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
