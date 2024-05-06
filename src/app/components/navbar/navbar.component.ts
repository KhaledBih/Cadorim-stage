import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/employee';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('addmodal')
  public addModal!: ModalDirective;
  employee = new Employee();
  employees: any;
  languageDropdownVisible = false;

  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getEmployeesdata();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('preferredLanguage', language); // Store selected language in local storage
  }
  toggleLanguageDropdown() {
    this.languageDropdownVisible = !this.languageDropdownVisible; // Toggle the visibility of the language selection dropdown
  }
  getCurrentLanguageCode(): string {
    // Get the current language code from the TranslateService
    const currentLanguage = this.translate.currentLang;
    // Extract the first two letters of the language code
    return currentLanguage.substr(0, 2).toUpperCase();
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
      // Display success message using Sweetalert2
    });
  }

  deleteData(id: any) {
    this.dataService.deleteData(id).subscribe((res) => {
      this.getEmployeesdata();
    });
  }

  openAddModal() {
    this.addModal.show();
  }

  addEmploy(form: NgForm) {
    this.insertData(form);
    Swal.fire({
      icon: 'success',
      title: this.translate.instant('Success'),
      text: this.translate.instant('Employee added successfully!'),
    });
    this.closeAddModal();
  }

  closeAddModal() {
    this.addModal.hide();
  }
}
