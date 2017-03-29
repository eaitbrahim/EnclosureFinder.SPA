import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { IFilter} from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit  {
    partNumberToFind: string;
    filterObj: IFilter;
    materialList: string[];
    ingressList: string[];
    serieList: string[];
    
    constructor(private router: Router, private itemsService: ItemsService,
         private dataService: DataService) { }
 
    ngOnInit() {
        this.partNumberToFind = '';
        this.materialList = ['ABS', 'Aluminum', 'Polypropylene', 'Polycarbonate', 'Polystyrene'];
        this.ingressList = ['IP55', 'IP65', 'IP66', 'IP67'];
        this.serieList = ['TK', 'TG', 'AL', 'EK', 'AK', 'Abox', 'AKL', 'HP', 'PB'];
        this.filterObj = {dimensionUnit: 'mm', materialList: [], ingressList: [], seriesList: []};
    }
 
    searchEnclosuresByPartNumber(partNumberForm: NgForm) {
        console.log(partNumberForm.value);
        this.dataService.setPartNumber(this.partNumberToFind);
        this.router.navigate(['/enclosureFinder', 'ByPartNumber']);
    }

    searchEnclosuresBySpecifications(specificationsForm: NgForm){
        console.log(this.filterObj);
        this.dataService.setSpecificationsToFind(this.filterObj);
        this.router.navigate(['/enclosureFinder', 'BySpecifications']);
    }

    materialCheckbox(isChecked: boolean, selectedItem: string){
        if(isChecked){
            this.itemsService.addItemToStart(this.filterObj.materialList, selectedItem);
        }else{
            this.itemsService.removeItemFromArray(this.filterObj.materialList, selectedItem);
        }
    }

    ingressCheckbox(isChecked: boolean, selectedItem: string){
        if(isChecked){
            this.itemsService.addItemToStart(this.filterObj.ingressList, selectedItem);
        }else{
            this.itemsService.removeItemFromArray(this.filterObj.ingressList, selectedItem);
        }
    }

    serieCheckbox(isChecked: boolean, selectedItem: string){
        if(isChecked){
            this.itemsService.addItemToStart(this.filterObj.seriesList, selectedItem);
        }else{
            this.itemsService.removeItemFromArray(this.filterObj.seriesList, selectedItem);
        }
    }

    submitSpecificationsForm(event, specificationsForm: NgForm) {
        if(event.keyCode == 13) {
            if(typeof this.filterObj.minLength === 'undefined' && typeof this.filterObj.maxLength === 'undefined' && 
                typeof this.filterObj.minWidth === 'undefined' && typeof this.filterObj.maxWidth === 'undefined' && 
                typeof this.filterObj.minDepth === 'undefined' && typeof this.filterObj.maxDepth === 'undefined' && 
                this.filterObj.materialList.length == 0 && this.filterObj.ingressList.length == 0 && 
                this.filterObj.seriesList.length == 0 && this.filterObj.outdoorUse == null && 
                this.filterObj.ulApproval == null && this.filterObj.nema4X == null){
                this.searchEnclosuresBySpecifications(specificationsForm);
            }
        }
    }
}