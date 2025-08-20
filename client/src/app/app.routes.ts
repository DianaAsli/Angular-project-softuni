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

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },

    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:category', component: CategoryComponent },

    {
        path: 'profile',
        component: MyProfileComponent,
        canActivate: [authGuard],
        children: [
            { path: 'info', component: MyInfoComponent },
            { path: 'favourites', component: FavouritesComponent },
            { path: 'comments', component: MyCommentsComponent },
            { path: '', redirectTo: 'info', pathMatch: 'full' }
        ]
    },

    { path: 'register', canActivate: [guestGuard], component: RegisterComponent },
    { path: 'login', canActivate: [guestGuard], component: LoginComponent },


];

