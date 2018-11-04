import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { config } from '../../app/config';

@Injectable()
export class Proveedor1Provider {

  constructor(public http: HttpClient) {
    console.log('Hello Proveedor1Provider Provider');
  }

  getRecipes(ingredients: string){
    return this.http.get(`https://www.food2fork.com/api/search?key=${config.apiKey}&q=${ingredients}`);
  }
}
