
import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { StoreDataService } from './../service/data/store-data.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

export class Store {
  public id: number;
  public storeName: string;
  public isActive: boolean;
  constructor(id: number, storeName: string, isActive: boolean) {
    this.id = id;
    this.storeName = storeName;
    this.isActive = isActive;
  }
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements AfterViewInit, OnDestroy,OnInit {

  stores: Store[];
  editstore: Store;
  store: Store;
  errorMessage: string;

  id: number;
  isActive: boolean;
  storeName: string;
  display = 'none';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private storeDataService: StoreDataService
    ,private http : HttpClient
    ) { }

  ngOnInit() {
    this.store = new Store(undefined, '', true);
    //this.getStores();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>('http://localhost:8080/stores/',dataTablesParameters, {}).subscribe(
            resp => {
              this.stores = resp.data;
              console.log(this.stores);
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
          });
      },
      columns: [
        { data: 'id' }, 
        { data: 'storeName' }, 
        { data: 'active' },
        {
          title: 'Action',
          render: function (data: any, type: any, full: any) {
            return 'View';
          }
        }
      ]
     
    };
    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  public resetData(storeForm: NgForm) {
    this.store = new Store(undefined, '', true);
  }
  public getStores() {
    this.rerender();

    // this.storeDataService.retrieveStores().subscribe(
    //   response => {
    //     this.stores = response;
    //   }, error => {
    //     this.errorMessage = error.message;
    //     console.log(error.message);
    //   },
    //   () => { });
  }

  public saveData() {
    this.storeDataService.saveStore(this.store).subscribe(
      response => {
        this.getStores();        
      }, error => {
        this.errorMessage = error.message;
        console.log(error.message);
      },
      () => { });
  }

  public openModal(editstore) {
    this.editstore = editstore;
    this.display = 'block';
  }
  public onCloseHandled() {
    this.display = 'none';
  }
  public onFinalDelete() {
    this.storeDataService.deleteStore(this.editstore.id).subscribe(
      response => {
        this.getStores();
        this.display = 'none';
      }, error => {
        this.errorMessage = error.message;
        console.log(error.message);
      },
      () => { });
  }
  public editStore(editstore) {
    this.store = editstore;
  }

}
