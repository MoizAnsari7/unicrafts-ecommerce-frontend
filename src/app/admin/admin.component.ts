import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';
import { NotiflixService } from '../services/notiflix.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false; // Sidebar initially open
  activeTab: string = 'dashboard'; // Default tab

  
constructor(private userService:UserService, private notiflixService:NotiflixService){}

  ngOnInit(): void {
   this.tokenCheck();
  }

 

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }


  tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      
      try {
        const decoded: any = jwt_decode.jwtDecode(token);
        console.log('Decoded Token:', decoded);
        if(decoded.role === 'admin'){
          this.isAdmin = true;
        }else{
          this.isAdmin =false;
        }
  
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          console.log('Token expired, logging out user...');
          // User logout logic
          localStorage.removeItem('token');

          // Optional: Clear other user-related data if stored
          localStorage.removeItem('user'); // Example: Custom user data
          
          // Redirect user to login page
          window.location.href = '/login';
          
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in localStorage.');
    }
  }

  logout(){
    this.userService.logout();
    this.notiflixService.info('Logout Successfully');
    window.location.href = '/login';
  }


  isSidebarCollapsed = false;
  toggleColor = 'dark';
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    if(this.toggleColor == 'dark'){

      this.toggleColor = 'light'
    }else{
      this.toggleColor = 'dark'
    }
  }
}
