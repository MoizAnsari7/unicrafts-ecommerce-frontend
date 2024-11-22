import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css'],
})
export class AddressManagementComponent implements OnInit {
  addresses: any[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.isLoading = true;
    this.userService.getAddresses().subscribe((addresses) => {
      this.addresses = addresses;
      this.isLoading = false;
    });
  }

  addAddress(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((newAddress:any) => {
      if (newAddress) {
        this.userService.addAddress(newAddress).subscribe(() => {
          this.loadAddresses();
        });
      }
    });
  }

  editAddress(address: any): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      data: { mode: 'edit', address },
    });

    dialogRef.afterClosed().subscribe((updatedAddress:any) => {
      if (updatedAddress) {
        this.userService.updateAddress(address._id, updatedAddress).subscribe(() => {
          this.loadAddresses();
        });
      }
    });
  }

  deleteAddress(addressId: string): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteAddress(addressId).subscribe(() => {
        this.loadAddresses();
      });
    }
  }
}
