import { Component, OnInit, Input, ViewChild, ViewContainerRef, trigger, state, style, animate, transition  } from '@angular/core';
import { IEnclosure, IFilter } from '../shared/interfaces';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ModalDirective } from 'ng2-bootstrap';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';

@Component({
    moduleId: module.id,
    selector: 'enclosure-card',
    templateUrl: 'enclosure-card.component.html',
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
export class EnclosureCardComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    apiHost: string;

    @Input() enclosure: IEnclosure;
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
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }
 
ngOnInit() {
        this.apiHost = this.configService.getApiHost();
    }

 viewEnclosureDetails(id: number) {
        this.selectedEnclosureId = id;
        this.dataService.getEnclosure(this.selectedEnclosureId)
            .subscribe((enclosure: IEnclosure) => {
                this.enclosureDetails = this.itemsService.getSerialized<IEnclosure>(enclosure);
                this.selectedEnclosureLoaded = true;
                this.childModal.show();//.open('lg');
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load enclosure. ' + error);
            });
    }
 
    public hideChildModal(): void {
        this.childModal.hide();
    }

}