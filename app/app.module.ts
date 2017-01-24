import './rxjs-operators';
 
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
 
import { AppComponent }   from './app.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { HomeComponent } from './home/home.component';
import {EnclosureFinderComponent} from './home/enclosure-finder.component';
import {EnclosureCardComponent} from './home/enclosure-card.component';
import { MobileHideDirective } from './shared/directives/mobile-hide.directive';
import { EnclosureEditComponent } from './enclosures/enclosure-edit.component';
import { EnclosureAddComponent } from './enclosures/enclosure-add.component';
import { EnclosureListComponent } from './enclosures/enclosure-list.component';
import { routing } from './app.routes';
import { DataService } from './shared/services/data.service';
import { ConfigService } from './shared/utils/config.service';
import { ItemsService } from './shared/utils/items.service';
import { NotificationService } from './shared/utils/notification.service';
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule,
        ModalModule,
        ProgressbarModule,
        PaginationModule,
        routing,
        TimepickerModule
    ],
    declarations: [
        AppComponent,
        HighlightDirective,
        HomeComponent,
        EnclosureFinderComponent,
        EnclosureCardComponent,
        MobileHideDirective,
        EnclosureEditComponent,
        EnclosureAddComponent,
        EnclosureListComponent
    ],
    providers: [
        ConfigService,
        DataService,
        ItemsService,
        NotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }