import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private dataService:DataService){
    
  }
  ngOnInit(): void {
    this.dtOptions = {
      // retrieve:true,
      // paging: false,
      // searching: false,
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'title'
      }, {
        title: 'Last name',
        data: 'description'
      }]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  loadData(){
    this.dataService.getData().subscribe((data:any)=>{
      this.rerender(data.products)
      
    })
  }
  reset(){
    
    this.rerender([])
  }
  rerender(data:any): void {
   
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtOptions.data=data
      // Call the dtTrigger to rerender again
      this.dtTrigger.next('');
    });
  }

}
