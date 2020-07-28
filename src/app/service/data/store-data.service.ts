
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from './../../app.constants';
import { Store } from './../../stores/stores.component';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor(private http : HttpClient) { }

  retrieveStores(){
    return this.http.get<Store[]>(`${API_URL}/stores/`);
  }
  saveStore(store:Store){
    console.log(store);
    return this.http.post(`${API_URL}/stores/save`,store)
  }
  deleteStore(id:number){
    return this.http.delete(`${API_URL}/stores/delete/${id}`)
  }
}
