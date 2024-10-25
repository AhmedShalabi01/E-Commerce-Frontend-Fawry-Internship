import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Observable, catchError, throwError } from 'rxjs';


@Component({
    templateUrl: './product.component.html',
    providers: [MessageService]

})
export class ProductComponent implements OnInit {

    isLoading: boolean = true;

    productDialog: boolean = false;

    categoryDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    categories: Category[] = [];

    product!: Product;

    category!: Category;

    selectedCategory!: Category;

    selectedProducts: Product[] = [];

    submittedProduct: boolean = false;

    submittedCategory: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService, private categoryservice: CategoryService) { }


    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);

        this.getProducts();
        this.getCategories();

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];
    }

    openNewProduct() {
        this.submittedProduct = false;
        this.productDialog = true;
        this.product = {} as Product;
        this.selectedCategory = {} as Category;
    }

    openNewCategory() {
        this.submittedCategory = false;
        this.categoryDialog = true;
        this.category = {} as Category;
    }

    getProducts() {
        this.productService.getProducts().subscribe({
            next: (response: Product[]) => {
                this.products = response;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error While Getting Data ' + error.message, life: 3000 });
            }
        });
    }

    getCategories() {
        this.categoryservice.getCategories().subscribe({
            next: (response: Category[]) => {
                this.categories = response;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error While Getting Data ' + error.message, life: 3000 });
            }
        });
    }

    saveNewCategory() {
        this.submittedCategory = true;
        if (this.category.categoryName?.trim()) {
            this.categoryservice.saveNewCategory(this.category)
                .pipe((err) => this.handleObservableError(err))
                .subscribe({
                    next: () => {
                        this.handleSuccess("Category Created");
                        this.categoryDialog = false;
                        this.getCategories();
                    }
                });

            this.category = {} as Category;
        }
    }

    saveProduct() {
        this.submittedProduct = true;

        this.product.categoryId = this.selectedCategory.categoryId;
        this.product.categoryName = this.selectedCategory.categoryName;

        if (this.validateProduct(this.product)) {
            if (this.product.id) {
                this.productService.updateProduct(this.product, this.product.id!)
                .pipe((err) => this.handleObservableError(err))
                .subscribe({
                    next: () => {
                        this.handleSuccess("Product Updated");
                        this.products[this.findIndexById(this.product.id)] = this.product;
                    }
                });
            } else {
                this.productService.addProduct(this.product).pipe((err) => this.handleObservableError(err))
                .subscribe({
                    next: () => this.handleSuccess("Product Created")
                });
            }

            this.products = [...this.products];
            this.productDialog = false;

        }
    }

    private validateProduct(product: Product): boolean {
        return (
            product &&
            product.name != null &&
            product.imageUrl != null &&
            product.price != null &&
            this.selectedCategory.categoryId != null &&
            this.selectedCategory.categoryName != null
        );
    }

    editProduct(product: Product) {
        this.product = { ...product };
        if (!this.selectedCategory) {
            this.selectedCategory = {
                categoryId: product.categoryId,
                categoryName: product.categoryName,
            };
        }
        else {
            this.selectedCategory.categoryId = product.categoryId;
            this.selectedCategory.categoryName = product.categoryName;
        }
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.selectedProducts.map(product => this.productService.deleteProduct(product.id!).subscribe());
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.productService.deleteProduct(this.product.id!)
            .subscribe(() => {
                this.products = this.products.filter(val => val.id !== this.product.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                this.products = [...this.products];

                this.product = {} as Product;
            });
    }

    hideProductDialog() {
        this.productDialog = false;
        this.submittedProduct = false;
        this.selectedCategory = {} as Category;
    }

    hideCategoryDialog() {
        this.categoryDialog = false;
        this.submittedCategory = false;
        this.category = {} as Category;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Handle successful and error message service
    private handleSuccess(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
    }

    private handleObservableError(observable: Observable<any>): Observable<any> {
        return observable.pipe(
            catchError((error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: `${error.error.message}`, life: 3000 });
                return throwError(() => error);
            })
        );
    }
}

