import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { UserService } from 'src/app/services/user.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false; // Admin visibility toggle
  cartItems: any;
  private authSub!: Subscription;

  constructor(
    public userService: UserService,
    private cdr: ChangeDetectorRef,
    private notiflixService: NotiflixService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status
    this.authSub = this.userService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
      this.checkAdminRole();
      this.cdr.detectChanges();
    });

    // Subscribe to cart items count
    this.cartService.cartItems.subscribe((length: number) => {
      this.cartItems = length;
    });
  }

  checkAdminRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt_decode.jwtDecode(token);
        this.isAdmin = decoded.role === 'admin'; // Check for admin role
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  logout(): void {
    this.userService.logout();
    this.notiflixService.info('Logout Successfully');
    window.location.href = '/login';
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
