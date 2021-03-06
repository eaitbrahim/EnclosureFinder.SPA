import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
import { IEnclosure, IFilter, Pagination, PaginatedResult } from '../interfaces';
import { ItemsService } from '../utils/items.service';
import { ConfigService } from '../utils/config.service';
 
@Injectable()
export class DataService {
 
    _baseUrl: string = '';
    _partNumberToFind: string = '';
    _specificationsToFind: IFilter;

    constructor(private http: Http,
        private itemsService: ItemsService,
        private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }
 
    setPartNumber(partNumberToFind: string){
        this._partNumberToFind = partNumberToFind;
    }

    getPartNumberToFind(): string{
        return this._partNumberToFind;
    }

    setSpecificationsToFind(specificationsToFind: IFilter){
        this._specificationsToFind = this.itemsService.getSerialized<IFilter>(specificationsToFind);
    }

    getSpecificationsToFind(): IFilter{
        return this._specificationsToFind;
    }

    getEnclosures(page?: number, itemsPerPage?: number): Observable<PaginatedResult<IEnclosure[]>> {
        var peginatedResult: PaginatedResult<IEnclosure[]> = new PaginatedResult<IEnclosure[]>();
 
        let headers = new Headers();
        if (page != null && itemsPerPage != null) {
            headers.append('Pagination', page + ',' + itemsPerPage);
        }
 
        return this.http.get(this._baseUrl + 'enclosures', {
            headers: headers
        })
            .map((res: Response) => {
                console.log(res.headers.keys());
                peginatedResult.result = res.json();
 
                if (res.headers.get("Pagination") != null) {
                    //var pagination = JSON.parse(res.headers.get("Pagination"));
                    var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
                    console.log(paginationHeader);
                    peginatedResult.pagination = paginationHeader;
                }
                return peginatedResult;
            })
            .catch(this.handleError);
    }

    getEnclosuresByPartNumber(partNumberToFind: string, page?: number, itemsPerPage?: number): Observable<PaginatedResult<IEnclosure[]>> {
        var peginatedResult: PaginatedResult<IEnclosure[]> = new PaginatedResult<IEnclosure[]>();
 
        let headers = new Headers();
        if (page != null && itemsPerPage != null) {
            headers.append('Pagination', page + ',' + itemsPerPage);
        }
 
        return this.http.get(this._baseUrl + 'enclosures/search?partNumber=' + partNumberToFind, {
            headers: headers
        })
            .map((res: Response) => {
                console.log(res.headers.keys());
                peginatedResult.result = res.json();
 
                if (res.headers.get("Pagination") != null) {
                    //var pagination = JSON.parse(res.headers.get("Pagination"));
                    var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
                    console.log(paginationHeader);
                    peginatedResult.pagination = paginationHeader;
                }
                return peginatedResult;
            })
            .catch(this.handleError);
    }

    filterEnclosures(filterObj: IFilter, page?: number, itemsPerPage?: number, partNumber?: string): Observable<PaginatedResult<IEnclosure[]>> {
        var peginatedResult: PaginatedResult<IEnclosure[]> = new PaginatedResult<IEnclosure[]>();
 
        let headers = new Headers();
        if (page != null && itemsPerPage != null) {
            headers.append('Pagination', page + ',' + itemsPerPage);
        }
        headers.append('Content-Type', 'application/json');
 
        return this.http.post(this._baseUrl + 'enclosures/filter', JSON.stringify(filterObj), {
            headers: headers
        })
        .map((res: Response) => {
                console.log(res.headers.keys());
                peginatedResult.result = res.json();
 
                if (res.headers.get("Pagination") != null) {
                    //var pagination = JSON.parse(res.headers.get("Pagination"));
                    var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
                    console.log(paginationHeader);
                    peginatedResult.pagination = paginationHeader;
                }
                return peginatedResult;
            })
            .catch(this.handleError);
    }
 
    getEnclosure(id: number): Observable<IEnclosure> {
        return this.http.get(this._baseUrl + 'enclosures/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
 
    updateEnclosure(enclosure: IEnclosure): Observable<void> {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        return this.http.put(this._baseUrl + 'enclosures/' + enclosure.id, JSON.stringify(enclosure), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    createEnclosure(enclosure: IEnclosure): Observable<IEnclosure> {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        return this.http.post(this._baseUrl + 'enclosures/', JSON.stringify(enclosure), {
            headers: headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
 
    deleteEnclosure(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'enclosures/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }
 
    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';
 
        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
 
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
 
        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
}