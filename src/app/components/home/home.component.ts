import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/employee';
import { NgForm } from '@angular/forms'; // Importez le module NgForm
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee = new Employee();
  employees: any;
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.getEmployeesdata();
  }
  getEmployeesdata() {
    this.dataService.getData().subscribe((res) => {
      this.employees = res;
    });
  }

  insertData(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.dataService.insertData(this.employee).subscribe((res) => {
      this.getEmployeesdata();
      form.resetForm();
    });
  }

  deleteData(id: any) {
    this.dataService.deleteData(id).subscribe((res) => {
      this.getEmployeesdata();
    });
  }
}
