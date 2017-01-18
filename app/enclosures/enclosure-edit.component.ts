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
    selector: 'app-enclosure-edit',
    templateUrl: 'enclosure-edit.component.html'
})
export class EnclosureEditComponent implements OnInit {
    apiHost: string;
    id: number;
    enclosure: IEnclosure;
    enclosureLoaded: boolean = false;
    materialList: string[];
    ingressList: string[];
    seriesList: string[];
    private sub: any;
 
    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }
 
    ngOnInit() {
        // (+) converts string 'id' to a number
        this.id = +this.route.snapshot.params['id'];
        this.apiHost = this.configService.getApiHost();
        this.loadEnclosureDetails();
    }
 
    loadEnclosureDetails() {
        //this.slimLoader.start();
        this.dataService.getEnclosure(this.id)
            .subscribe((enclosure: IEnclosure) => {
                this.enclosure = this.itemsService.getSerialized<IEnclosure>(enclosure);
                this.enclosureLoaded = true;
                this.materialList = this.enclosure.materialList;
                this.ingressList = this.enclosure.ingressList;
                this.seriesList = this.enclosure.seriesList;
                 
                //this.slimLoader.complete();
            },
            error => {
                //this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to load schedule. ' + error);
            });
    }
 
    updateEnclosure(editEnclosureForm: NgForm) {
        console.log(editEnclosureForm.value);
 
        //this.slimLoader.start();
        this.dataService.updateEnclosure(this.enclosure)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Enclosure has been updated');
                //this.slimLoader.complete();
            },
            error => {
                //this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to update enclosure. ' + error);
            });
    }
 
    back() {
        this.router.navigate(['/enclosures']);
    }
 
}