import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/employee';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('addmodal') public addModal!: ModalDirective;
  @ViewChild('loginmodal') public loginmodal!: ModalDirective;
  employee = new Employee();
  employees: any;
  languageDropdownVisible = false;
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };

  constructor(
    private dataService: DataService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployeesdata();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('preferredLanguage', language);
  }

  toggleLanguageDropdown() {
    this.languageDropdownVisible = !this.languageDropdownVisible;
  }

  getCurrentLanguageCode(): string {
    const currentLanguage = this.translate.currentLang;
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

  closeAddModal() {
    this.addModal.hide();
  }

  addEmploy(form: NgForm) {
    this.registerUser(form);
  }

  registerUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.dataService.register(this.registerData).subscribe(
      (response) => {
        this.dataService.setAuthToken(response.token);
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('Success'),
          text: this.translate.instant('Employee added successfully!'),
        });
        this.getEmployeesdata();
        form.resetForm();
        this.closeAddModal();
        this.router.navigate(['/crud']); // Redirect to home or another page
      },
      (error) => {
        console.error('Registration failed:', error);
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('Error'),
          text: this.translate.instant(
            'Registration failed. Please try again.'
          ),
        });
      }
    );
  }

  //login
  login() {
    this.dataService.login(this.loginData).subscribe(
      (response) => {
        this.dataService.setAuthToken(response.token);
        //this.dataService.setAuthenticated(true);
        this.router.navigate(['/crud']);
      },
      (error) => {
        console.error('Login failed:', error);
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('Error'),
          text: this.translate.instant('Login failed. Please try again.'),
        });
      }
    );
  }

  openLoginModal() {
    this.loginmodal.show();
  }

  closeLoginModal() {
    this.loginmodal.hide();
  }

  isUserAuthenticated(): boolean {
    return this.dataService.isAuthenticated();
  }
}
