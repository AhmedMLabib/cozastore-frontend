import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  constructor(private prodctS: ProductsService) {}
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    countInStock: new FormControl('', [Validators.required]),
    isActive: new FormControl(false),
    showInHome: new FormControl(false),
    image: new FormControl(null, [Validators.required]),
  });
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({ image: file });
    }
  }
  addProduct() {
    let formData = new FormData();
    formData.append('name', this.productForm.get('name')!.value || '');
    formData.append('price', this.productForm.get('price')!.value || '');
    formData.append(
      'description',
      this.productForm.get('description')!.value || ''
    );
    formData.append('category', this.productForm.get('category')!.value || '');
    formData.append(
      'countInStock',
      this.productForm.get('countInStock')!.value || ''
    );
    formData.append(
      'isActive',
      String(this.productForm.get('isActive')?.value || false)
    );
    formData.append(
      'showInHome',
      String(this.productForm.get('showInHome')?.value || false)
    );
    formData.append('image', this.productForm.get('image')!.value || '');
    this.prodctS.addNewProduct(formData).subscribe((data) => {
      alert('Product Added Successfully');
      this.productForm.reset();
    });
  }
}
