import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
 
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { IEnclosure } from '../shared/interfaces';
 
@Component({
    moduleId: module.id,
    selector: 'app-enclosure-add',
    templateUrl: 'enclosure-add.component.html'
})
export class EnclosureAddComponent implements OnInit {
    apiHost: string;
    enclosure: IEnclosure;
    addingEnclosure: boolean = false;
 
    private sub: any;
 
    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }
 
    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
    }
 
    enclosureCreated(enclosure: any) {
        var _enclosure: IEnclosure = this.itemsService.getSerialized<IEnclosure>(enclosure.value);
        this.addingEnclosure = false;
        // inform user
        this.notificationService.printSuccessMessage('Enclosure has been created');
        console.log(_enclosure.id);
    }
 
    addEnclosure(addEnclosureForm: NgForm) {
        console.log(addEnclosureForm.value);
 
        //this.slimLoader.start();
        this.dataService.createEnclosure(this.enclosure)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Enclosure has been created');
                //this.slimLoader.complete();
            },
            error => {
                //this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to create enclosure. ' + error);
            });
    }
 
    cancelAddEnclosure() {
        
    }
 
}