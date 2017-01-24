import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { IFilter} from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit  {
    partNumberToFind: string;
    filterObj: IFilter;
    
    constructor(private router: Router, private dataService: DataService) { }
 
    ngOnInit() {
        this.partNumberToFind = '';
    }
 
    searchEnclosuresByPartNumber(partNumberForm: NgForm) {
        console.log(partNumberForm.value);
        this.dataService.setPartNumber(this.partNumberToFind);
        this.router.navigate(['/enclosureFinder', 'ByPartNumber']);
    }
}