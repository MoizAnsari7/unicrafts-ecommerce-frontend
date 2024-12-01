import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  private authSub!: Subscription;
  
  constructor(public userService : UserService,  private cdr: ChangeDetectorRef, private notiflixService : NotiflixService) { }

  ngOnInit(): void {
    this.authSub = this.userService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
      this.cdr.detectChanges(); 
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
