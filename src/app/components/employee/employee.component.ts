// import { Component, OnInit, ViewChild } from '@angular/core';
// import { DataService } from 'src/app/service/data.service';
// import { Employee } from 'src/app/employee';
// import { ModalDirective } from 'ngx-bootstrap/modal';
// import {
//   UntypedFormBuilder,
//   UntypedFormGroup,
//   Validators,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { TranslateService } from '@ngx-translate/core'; // Import TranslateService

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css'],
// })
// export class EmployeeComponent implements OnInit {
//   @ViewChild('editmodal')
//   public editModal!: ModalDirective;
//   employees: any;
//   pagedItems: Employee[] = [];
//   employeeForm!: UntypedFormGroup;
//   id: any;
//   count = 0;
//   currentPage = 1;
//   pageSize = 5;
//   loading = false;

//   // Inject TranslateService
//   constructor(
//     private dataService: DataService,
//     private router: Router,
//     private formBuilder: UntypedFormBuilder,
//     private translate: TranslateService
//   ) {}

//   ngOnInit() {
//     this.getEmployeesdata();
//     this.employeeForm = this.formBuilder.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }

//   getEmployeesdata() {
//     this.loading = true;
//     this.dataService.getData().subscribe({
//       next: (res) => {
//         this.employees = res;
//       },
//       error: (err) => {
//         console.log(err);
//         this.loading = false;
//       },
//       complete: () => {
//         this.loading = false;
//       },
//     });
//   }

//   deleteData(id: any) {
//     // Translate the strings before passing them to Swal.fire()
//     const confirmTitle = this.translate.instant('Are you sure?');
//     const confirmText = this.translate.instant(
//       'You will not be able to recover this employee!'
//     );
//     const confirmButtonText = this.translate.instant('Yes, delete it!');
//     const cancelButtonText = this.translate.instant('No, keep it');

//     Swal.fire({
//       title: confirmTitle,
//       text: confirmText,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: confirmButtonText,
//       cancelButtonText: cancelButtonText,
//       cancelButtonColor: 'gray',
//       confirmButtonColor: 'red',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.dataService.deleteData(id).subscribe(() => {
//           this.getEmployeesdata();
//           // Translate the success message
//           const deletedTitle = this.translate.instant('Deleted!');
//           const deletedMessage = this.translate.instant(
//             'Your employee has been deleted.'
//           );
//           Swal.fire(deletedTitle, deletedMessage, 'success');
//         });
//       }
//     });
//   }

//   updateEmployee() {
//     if (this.employeeForm.valid) {
//       this.dataService.updateData(this.id, this.employeeForm.value).subscribe(
//         () => {
//           this.getEmployeesdata();
//           // Translate the success message
//           const updatedTitle = this.translate.instant('Updated!');
//           const updatedMessage = this.translate.instant(
//             'Your employee has been updated.'
//           );
//           Swal.fire({
//             title: updatedTitle,
//             text: updatedMessage,
//             timer: 2000,
//             confirmButtonColor: 'green',
//           });
//         },
//         (error) => {
//           console.log(error);
//           // Translate the error message
//           const errorTitle = this.translate.instant('Error!');
//           const errorMessage = this.translate.instant(
//             'There was an error updating the employee.'
//           );
//           Swal.fire(errorTitle, errorMessage, 'error');
//         }
//       );
//     } else {
//       // Handle form validation errors
//     }
//   }

//   openEditModal(data: { [x: string]: any; id?: any }) {
//     this.id = data.id;
//     this.editModal.show();
//     this.employeeForm.patchValue(data);
//     setTimeout(() => {
//       (
//         document.querySelector('input[type="text"]') as HTMLInputElement
//       ).focus();
//     }, 100);
//   }

//   saveChanges() {
//     if (this.employeeForm.valid) {
//       this.updateEmployee();
//       this.closeModal();
//     } else {
//       // Gérer les erreurs de validation du formulaire
//     }
//   }

//   closeModal() {
//     this.editModal.hide();
//   }

//   // Méthodes de pagination
//   pageChanged(page: number) {
//     console.log(page);
//     this.currentPage = page; // Mettre à jour le numéro de la page actuelle
//     this.employees;
//     // this.setPage(page);
//   }

//   setPage(page: number) {
//     const startIndex = (page - 1) * this.pageSize;
//     console.log(startIndex);

//     const endIndex = Math.min(
//       startIndex + this.pageSize,
//       this.employees.length
//     );
//     console.log(endIndex);
//     this.pagedItems = this.employees.slice(startIndex, endIndex);
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/employee';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('editmodal')
  public editModal!: ModalDirective;
  employees: any;
  pagedItems: Employee[] = [];
  employeeForm!: UntypedFormGroup;
  id: any;
  count = 0;
  currentPage = 1;
  pageSize = 5;
  loading = false;

  // Inject TranslateService
  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getEmployeesdata();
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getEmployeesdata() {
    this.loading = true;
    this.dataService.getData().subscribe({
      next: (res) => {
        this.employees = res;
        this.setPage(this.currentPage); // Mettez à jour les éléments paginés
      },
      error: (err) => {
        console.log('Error fetching employees:', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteData(id: any) {
    // Translate the strings before passing them to Swal.fire()
    const confirmTitle = this.translate.instant('Are you sure?');
    const confirmText = this.translate.instant(
      'You will not be able to recover this employee!'
    );
    const confirmButtonText = this.translate.instant('Yes, delete it!');
    const cancelButtonText = this.translate.instant('No, keep it');

    Swal.fire({
      title: confirmTitle,
      text: confirmText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      cancelButtonColor: 'gray',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteData(id).subscribe(() => {
          this.getEmployeesdata();
          const deletedTitle = this.translate.instant('Deleted!');
          const deletedMessage = this.translate.instant(
            'Your employee has been deleted.'
          );
          Swal.fire(deletedTitle, deletedMessage, 'success');
        });
      }
    });
  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      this.dataService.updateData(this.id, this.employeeForm.value).subscribe(
        () => {
          this.getEmployeesdata();
          const updatedTitle = this.translate.instant('Updated!');
          const updatedMessage = this.translate.instant(
            'Your employee has been updated.'
          );
          Swal.fire({
            title: updatedTitle,
            text: updatedMessage,
            timer: 2000,
            confirmButtonColor: 'green',
          });
        },
        (error) => {
          console.log('Error updating employee:', error);
          const errorTitle = this.translate.instant('Error!');
          const errorMessage = this.translate.instant(
            'There was an error updating the employee.'
          );
          Swal.fire(errorTitle, errorMessage, 'error');
        }
      );
    } else {
      // Handle form validation errors
    }
  }

  openEditModal(data: { [x: string]: any; id?: any }) {
    this.id = data.id;
    this.editModal.show();
    this.employeeForm.patchValue(data);
    setTimeout(() => {
      (
        document.querySelector('input[type="text"]') as HTMLInputElement
      ).focus();
    }, 100);
  }

  saveChanges() {
    if (this.employeeForm.valid) {
      this.updateEmployee();
      this.closeModal();
    } else {
      // Handle form validation errors
    }
  }

  closeModal() {
    this.editModal.hide();
  }

  pageChanged(page: number) {
    console.log(page);
    this.currentPage = page;
    this.setPage(page);
  }

  setPage(page: number) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.employees.length
    );
    this.pagedItems = this.employees.slice(startIndex, endIndex);
  }
}
