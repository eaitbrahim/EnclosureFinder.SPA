import { Component, Input, Output, ViewContainerRef, EventEmitter, trigger, state, style} from '@angular/core';
import { IEnclosure, IFilter } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { HighlightDirective } from '../shared/directives/highlight.directive';

@Component({
    moduleId: module.id,
    selector: 'enclosure-specifications',
    templateUrl: 'enclosure-specifications.component.html'
})
export class EnclosureSpecificationsComponent {
    @Input() filterObj: IFilter;
    @Input() currentPage: number;
    @Input() itemsPerPage: number;
    @Output() enclosuresFound = new EventEmitter();
    
    public isFirstOpen: boolean = true;

    constructor(private itemsService: ItemsService,
        private notificationService: NotificationService,
        private dataService: DataService,
        private configService: ConfigService) { }
 
    searchBySpecifications(){
        var _filterObj: IFilter = this.itemsService.getSerialized<IFilter>(this.filterObj); 
        
        this.dataService.filterEnclosures(_filterObj, this.currentPage, this.itemsPerPage)
            .subscribe((res) => { 
                this.enclosuresFound.emit({value: res});
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load enclosures. ' + error);
            });
    }

}