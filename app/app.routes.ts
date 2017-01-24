import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import {EnclosureFinderComponent} from './home/enclosure-finder.component';
import { EnclosureListComponent } from './enclosures/enclosure-list.component';
import { EnclosureEditComponent } from './enclosures/enclosure-edit.component';
import { EnclosureAddComponent } from './enclosures/enclosure-add.component';
 
const appRoutes: Routes = [
    { path: 'enclosures', component: EnclosureListComponent },
    { path: 'enclosures/:id/edit', component: EnclosureEditComponent },
    { path: 'enclosures/add', component: EnclosureAddComponent },
    { path: '', component: HomeComponent },
    { path: 'enclosureFinder/:searchMethod', component: EnclosureFinderComponent}
];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);