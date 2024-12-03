import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  cartItems : any;
  private authSub!: Subscription;
  
  constructor(public userService : UserService,  private cdr: ChangeDetectorRef, private notiflixService : NotiflixService, public cartService : CartService) { }

  ngOnInit(): void {
    this.authSub = this.userService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
      this.cdr.detectChanges(); 
    });

    this.cartService.cartItems.subscribe((length: number) => {
      this.cartItems = length;
    });
  }


  logout(){
    this.userService.logout();
    this.notiflixService.info("Logout SuccessFully")
    window.location.href = "/login"
  }


  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
