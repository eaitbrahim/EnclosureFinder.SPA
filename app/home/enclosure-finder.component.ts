import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEnclosure, IFilter, Pagination, PaginatedResult } from '../shared/interfaces';
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
    criteriaList: string[] = [];
    apiHost: string;
    searchMethod: string;
    partNumberToFind: string;
    specificationsToFind: IFilter;
    enclosuresLoaded: boolean = false;
    enclosuresNotFound: boolean = false;
    public itemsPerPage: number = 20;
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
            this.criteriaList.push('Part Number contains ' + this.partNumberToFind);
            this.getEnclosuresByPartNumber();
        } else if(this.searchMethod == "BySpecifications"){
            this.specificationsToFind = this.dataService.getSpecificationsToFind();
            this.setCriteriaList(this.specificationsToFind);
            this.getEnclosuresBySpecifications();
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
 
    getEnclosuresBySpecifications(){
        this.dataService.filterEnclosures(this.specificationsToFind, this.currentPage, this.itemsPerPage)
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

    setCriteriaList(filterObj: IFilter){
        if(!!filterObj.minLength){
            this.criteriaList.push(`${filterObj.minLength} ${filterObj.dimensionUnit} <= Min Length`);
        }
        if(!!filterObj.minWidth){
            this.criteriaList.push(`${filterObj.minWidth} ${filterObj.dimensionUnit} <= Min Width`);
        }
        if(!!filterObj.minDepth){
            this.criteriaList.push(`${filterObj.minDepth} ${filterObj.dimensionUnit} <= Min Depth`);
        }
        if(!!filterObj.maxLength){
            this.criteriaList.push(`Max Length <= ${filterObj.maxLength} ${filterObj.dimensionUnit}`);
        }
        if(!!filterObj.maxWidth){
            this.criteriaList.push(`Max Width <= ${filterObj.maxWidth} ${filterObj.dimensionUnit}`);
        }
        if(!!filterObj.maxDepth){
            this.criteriaList.push(`Max Depth <= ${filterObj.maxDepth} ${filterObj.dimensionUnit}`);
        }
        if(!!filterObj.materialList && filterObj.materialList.length > 0){
            this.criteriaList.push(`Material in [${filterObj.materialList.toString()}]`);
        }
        if(!!filterObj.ingressList && filterObj.ingressList.length > 0){
            this.criteriaList.push(`Ingress Protection in [${filterObj.ingressList.toString()}]`);
        }
        if(!!filterObj.seriesList && filterObj.seriesList.length > 0){
            this.criteriaList.push(`Series in [${filterObj.seriesList.toString()}]`);
        }
        if(!!filterObj.outdoorUse){
            this.criteriaList.push(`Outdoor Use is ${filterObj.outdoorUse}`);
        }
        if(!!filterObj.ulApproval){
            this.criteriaList.push(`UL Approval is ${filterObj.ulApproval}`);
        }
        if(!!filterObj.nema4X){
            this.criteriaList.push(`NEMA 4X is ${filterObj.nema4X}`);
        }
    }

    pageChanged(event: any): void {
        window.location.hash = '#top';
        this.currentPage = event.page;
        if(this.searchMethod == "ByPartNumber"){
            this.getEnclosuresByPartNumber();
        }else{
            this.getEnclosuresBySpecifications();
        }
    };

    public hideChildModal(): void {
        this.childModal.hide();
    }

    back() {
        this.router.navigate(['']);
    }
 
}