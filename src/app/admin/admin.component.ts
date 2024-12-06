import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false; // Sidebar initially open
  activeTab: string = 'dashboard'; // Default tab

  
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
}
