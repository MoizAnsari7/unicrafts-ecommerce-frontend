import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css'],
})
export class AddressManagementComponent implements OnInit {
  addresses: any[] = [];
  isLoading: boolean = true;

  // Dialog variables
  isDialogOpen = false;
  mode: 'add' | 'edit' = 'add';
  currentAddress: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  /**
   * Load addresses from the server.
   */
  loadAddresses(): void {
    this.isLoading = true;
    this.userService.getAddresses().subscribe(
      (addresses) => {
        this.addresses = addresses;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading addresses:', error);
        this.isLoading = false;
      }
    );
  }

  /**
   * Open dialog for adding or editing addresses.
   */
  openDialog(mode: 'add' | 'edit', address: any = {}): void {
    this.isDialogOpen = true;
    this.mode = mode;
    this.currentAddress = mode === 'edit' ? { ...address } : {};
  }

  /**
   * Close dialog without saving changes.
   */
  closeDialog(): void {
    this.isDialogOpen = false;
  }

  /**
   * Handle saving an address.
   */
  handleSave(address: any): void {
    if (this.mode === 'add') {
      // Add new address
      this.userService.addAddress(address).subscribe(
        () => this.loadAddresses(),
        (error) => console.error('Error adding address:', error)
      );
    } else if (this.mode === 'edit') {
      // Update existing address
      this.userService.updateAddress(this.currentAddress._id, address).subscribe(
        () => this.loadAddresses(),
        (error) => console.error('Error updating address:', error)
      );
    }
    this.closeDialog();
  }

  /**
   * Delete an address.
   */
  deleteAddress(addressId: string): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteAddress(addressId).subscribe(
        () => this.loadAddresses(),
        (error) => console.error('Error deleting address:', error)
      );
    }
  }
}
