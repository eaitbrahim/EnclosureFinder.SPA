import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEnclosure, Pagination, PaginatedResult } from '../shared/interfaces';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ModalDirective } from 'ng2-bootstrap';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import {EnclosureCardComponent} from './enclosure-card.component';

@Component({
    moduleId: module.id,
    selector: 'enclosure-finder',
    templateUrl: 'enclosure-finder.component.html'
})
export class EnclosureFinderComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    enclosures: IEnclosure[];
    apiHost: string;
    searchMethod: string;
    partNumberToFind: string;
    enclosuresLoaded: boolean = false;
    enclosuresNotFound: boolean = false;
    public itemsPerPage: number = 3;
    public totalItems: number = 0;
    public currentPage: number = 1;
 
    // Modal properties
    @ViewChild('modal')
    modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    selectedEnclosureId: number;
    enclosureDetails: IEnclosure;
    selectedEnclosureLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
 
    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }
 
    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.searchMethod = this.route.snapshot.params['searchMethod'];
        if(this.searchMethod == "ByPartNumber"){
            this.partNumberToFind = this.dataService.getPartNumberToFind();
            this.getEnclosuresByPartNumber();
        } else if(this.searchMethod == "BySpecifications"){

        }else{
            this.back();
        }
    }

    getEnclosuresByPartNumber(){
        this.dataService.getEnclosuresByPartNumber(this.partNumberToFind, this.currentPage, this.itemsPerPage)
               .subscribe((res: PaginatedResult<IEnclosure[]>) => {
                this.enclosures = res.result;// enclosures;
                this.totalItems = res.pagination.TotalItems;
                this.enclosuresLoaded = true;
                if(this.totalItems == 0){
                    this.enclosuresNotFound = true;
                }
                document.body.scrollTop = 0;
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load enclosures. ' + error);
            });
    }
 
    pageChanged(event: any): void {
        this.currentPage = event.page;
        if(this.searchMethod == "ByPartNumber"){
            this.getEnclosuresByPartNumber();
        }
    };

    public hideChildModal(): void {
        this.childModal.hide();
        
    }

    back() {
        this.router.navigate(['']);
    }
 
}