import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css'],
})
export class AddressManagementComponent implements OnInit {
  addresses: any[] = [];
  isLoading = true;
  isDialogOpen = false;
  mode: 'add' | 'edit' = 'add';
  currentAddress: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
    setTimeout(()=>{
      this.loadAddresses();
    },1000)
  }

  loadAddresses(): void {
    this.isLoading = true;
    this.userService.getAddresses().subscribe(
      (res) => {
        this.addresses = res.address;
        this.isLoading = false;
        console.log(res.address);
        
      },
      (error) => {
        console.error('Error loading addresses:', error);
        this.isLoading = false;
      }
    );
  }

  openDialog(mode: 'add' | 'edit', address: any = {}): void {
    this.isDialogOpen = true;
    this.mode = mode;
    this.currentAddress = mode === 'edit' ? { ...address } : {};
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  saveAddress(): void {
    if (this.mode === 'add') {
      this.userService.addAddress(this.currentAddress).subscribe((res:any) => {
        this.loadAddresses()
      });

    } else {
      this.userService.updateAddress(this.currentAddress._id, this.currentAddress).subscribe(() => this.loadAddresses());
    }
    this.closeDialog();
  }

  deleteAddress(addressId: any) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteAddress(addressId).subscribe((res:any) =>{ 
        this.loadAddresses();
        console.log("ressssssssssss",res);
        
    });
    }
  }
}
