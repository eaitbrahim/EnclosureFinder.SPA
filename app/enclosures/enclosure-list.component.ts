import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';
 
import { ModalDirective } from 'ng2-bootstrap';
 
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { IEnclosure, Pagination, PaginatedResult } from '../shared/interfaces';
 
@Component({
    moduleId: module.id,
    selector: 'app-enclosuresList',
    templateUrl: 'enclosure-list.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class EnclosureListComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    enclosures: IEnclosure[];
    apiHost: string;
 
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
 
    constructor(
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }
 
    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadEnclosures();
    }
 
    loadEnclosures() {
        //this.loadingBarService.start();
 
        this.dataService.getEnclosures(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<IEnclosure[]>) => {
                this.enclosures = res.result;// enclosures;
                this.totalItems = res.pagination.TotalItems;
                //this.loadingBarService.complete();
            },
            error => {
                //this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Failed to load enclosures. ' + error);
            });
    }
 
    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadEnclosures();
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };
 
    removeEnclosure(enclosure: IEnclosure) {
        this.notificationService.openConfirmationDialog('Are you sure you want to delete this enclosure?',
            () => {
                //this.loadingBarService.start();
                this.dataService.deleteEnclosure(enclosure.id)
                    .subscribe(() => {
                        this.itemsService.removeItemFromArray<IEnclosure>(this.enclosures, enclosure);
                        this.notificationService.printSuccessMessage('The enclosure has been deleted.');
                        //this.loadingBarService.complete();
                    },
                    error => {
                        //this.loadingBarService.complete();
                        this.notificationService.printErrorMessage('Failed to delete the enclosure: ' + error);
                    });
            });
    }
 
    viewEnclosureDetails(id: number) {
        this.selectedEnclosureId = id;
 
        this.dataService.getEnclosure(this.selectedEnclosureId)
            .subscribe((enclosure: IEnclosure) => {
                this.enclosureDetails = this.itemsService.getSerialized<IEnclosure>(enclosure);
                //this.slimLoader.complete();
                this.selectedEnclosureLoaded = true;
                this.childModal.show();//.open('lg');
            },
            error => {
                //this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to load enclosure. ' + error);
            });
    }
 
    public hideChildModal(): void {
        this.childModal.hide();
    }

    addEnclosure() {
        this.router.navigate(['/enclosures/add']);
    }
}