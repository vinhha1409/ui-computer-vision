import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent implements OnInit {
  datasource = [];
 
  status = [
    { name: 'Late', value: 1 },
    { name: 'Soon', value: 0 }
  ];

  now: Date = new Date();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getDataSource();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  onValuChange(e) {
      this.getDataSource(e.value)
  }

  getDataSource(e?) {
    let date = new Date();
    if (e) {
      date = e;
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.dataService
      .getUsersByDate(day, month, year)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res : any) => {
       this.datasource = res;
       this.datasource.forEach(element => {
         let hour =  element["time"].slice(11,13);
         let min =  element["time"].slice(14,16);
         let sec =  element["time"].slice(17,20);
        element["Time"] = new Date(year, day, month, hour, min, sec);
        element["Name"] = element["name"];
        element["IsLate"] = element["isLate"]
       });
      });
  }
}
