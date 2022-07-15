import {Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {UserComponent} from '../../user/user.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'new', component: HomeComponent},
    {path: 'user', component: UserComponent},
];
