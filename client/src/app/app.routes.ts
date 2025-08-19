import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { AboutComponent } from './features/about/about.component';
import { ContactsComponent } from './features/contacts/contacts.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { CategoryComponent } from './features/categories/category/category.component';
import { MyProfileComponent } from './features/profile/my-profile/my-profile.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactsComponent },
    { path: 'profile', component: MyProfileComponent },

    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:category', component: CategoryComponent },

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: 'product/:id', component: ProductDetailsComponent }
];

