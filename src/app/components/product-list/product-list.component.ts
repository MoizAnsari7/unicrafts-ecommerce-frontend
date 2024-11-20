import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a short description of product 1.',
      price: 499,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a short description of product 2.',
      price: 699,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a short description of product 3.',
      price: 999,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is a short description of product 4.',
      price: 299,
      image: 'https://via.placeholder.com/300x200',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
