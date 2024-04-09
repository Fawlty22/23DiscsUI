import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CollectionComponent } from './collection/collection.component';
import { LoginComponent } from './login/login.component';
import { authGuard} from '../app/core/guards/auth.guard';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'collection', component: CollectionComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent},
    { path: '**',   redirectTo: '/profile'  },
];

// Upgrade the wildcard catch 