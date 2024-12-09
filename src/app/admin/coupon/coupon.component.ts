import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponService } from '../adminService/coupon.service';
import { NotiflixService } from 'src/app/services/notiflix.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  coupons: any[] = [];
  isModalOpen = false;
  isEditMode = false;
  couponForm!: FormGroup;
  selectedCouponId: string | null = null;

  constructor(private fb: FormBuilder, private couponService: CouponService, private notiflix: NotiflixService) {}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ['', Validators.required],
      discountAmount: [0, [Validators.required]],
      expirationDate: ['', Validators.required],
      isActive: [true, Validators.required],
    });

    this.loadCoupons();
  }

  loadCoupons() {
    this.couponService.getCoupons().subscribe((data:any) => {
      this.coupons = data.coupon; 
    });
  }

  openCouponModal(coupon: any = null) {
    this.isModalOpen = true;
    this.isEditMode = !!coupon;
    this.selectedCouponId = coupon?._id || null;

    if (coupon) {
      this.couponForm.patchValue(coupon);
    } else {
      this.couponForm.reset({ isActive: true });
    }
  }

  closeCouponModal() {
    this.isModalOpen = false;
    this.couponForm.reset({ isActive: true });
  }

  saveCoupon() {
    if (this.couponForm.invalid) return;

    const couponData = this.couponForm.value;

    if (this.isEditMode && this.selectedCouponId) {
      this.couponService
        .updateCoupon(this.selectedCouponId, couponData)
        .subscribe((res:any) => {this.loadCoupons();
          this.notiflix.success(res.message)
        });
    } else {
      this.couponService.createCoupon(couponData).subscribe((res:any) => {this.loadCoupons();
        this.notiflix.info(res.message)
      });
    }

    this.closeCouponModal();
  }

  deleteCoupon(couponId: string) {
    this.couponService.deleteCoupon(couponId).subscribe((res:any) =>{
       this.loadCoupons();
       this.notiflix.warning(res.message);
      });
  }



}
