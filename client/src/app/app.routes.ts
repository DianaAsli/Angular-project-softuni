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
import { MyInfoComponent } from './features/profile/my-info/my-info/my-info.component';
import { FavouritesComponent } from './features/profile/favourites/favourites/favourites.component';
import { MyCommentsComponent } from './features/profile/my-comments/my-comments/my-comments.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactsComponent },

    { path: 'product/:id', loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    { path: 'categories', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent) },
    { path: 'categories/:category', loadComponent: () => import('./features/categories/category/category.component').then(m => m.CategoryComponent) },

    {
        path: 'profile',
        loadComponent:() => import('./features/profile/my-profile/my-profile.component').then(m=>m.MyProfileComponent),
        canActivate: [authGuard],
        children: [
            { path: 'info', loadComponent:() => import('./features/profile/my-info/my-info/my-info.component').then(m=>m.MyInfoComponent) },
            { path: 'favourites', loadComponent:() => import('./features/profile/favourites/favourites/favourites.component').then(m=>m.FavouritesComponent) },
            { path: 'comments', loadComponent:() => import('./features/profile/my-comments/my-comments/my-comments.component').then(m=>m.MyCommentsComponent) },
            { path: '', redirectTo: 'info', pathMatch: 'full' }
        ]
    },

    { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
    { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },

    { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) }
];

