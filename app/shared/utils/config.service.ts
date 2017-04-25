import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor() {
        //this._apiURI = 'http://localhost:64183/api/';
        this._apiURI = 'http://enclosurefinderapieastofusa.azurewebsites.net/api/'; 
        //'http://enclosure.altechcorp.com/api/'
     }
 
     getApiURI() {
         return this._apiURI;
     }
 
     getApiHost() {
         return this._apiURI.replace('api/','');
     }
}