import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  profileForm!: FormGroup;
  user: any;  // This will hold the user data
  selectedProfilePicture!: File;
  profilePicturePreview: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private notiflix : NotiflixService) { }

  ngOnInit(): void {
    // Initialize the profile form with validation rules
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: [null]
    });

 this.fetchUserProfile();
    }

  // fetch user profile
  fetchUserProfile(){
    this.userService.getProfile().subscribe(
      (data) => {
        this.user = data.user; 
        
        setTimeout(()=>{
          this.profileForm.patchValue({
           username: this.user.username,
           email: this.user.email
         });
        },2000)
        
        console.log("profile", data);
        this.notiflix.info(data.message)
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  // Save the profile updates
  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.profileForm.value.username);
    formData.append('email', this.profileForm.value.email);
   
    const updatedUser = { ...this.profileForm.value };
    this.userService.updateProfile(updatedUser).subscribe(
      (response) => {
       this.notiflix.success(response.message);
       this.fetchUserProfile();
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }

  // Handle file input for profile picture
  onProfilePictureChange(event: any): void {
    const selectedFile  = event.target.files[0];
    if(selectedFile){
      const formData = new FormData();
    formData.append('profilePicture', selectedFile, selectedFile.name);
    
// Preview the image locally (using URL.createObjectURL)
const reader = new FileReader();
reader.onload = () => {
  this.profilePicturePreview = reader.result as string;
};
reader.readAsDataURL(selectedFile);

    this.userService.uploadProfilePicture(formData).subscribe((res:any)=>{
      console.log(res);
      
    },(err:any)=>{
      console.log("errrrrrrrrr",err);
      
    })
  }
  }

  // Getter for form controls (to make the template cleaner)
  get f() {
    return this.profileForm.controls;
  }

}
