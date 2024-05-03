import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'; // Importez FormBuilder et FormGroup
import { Employee } from 'src/app/employee';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  id: any;
  data: any;
  employeeForm!: UntypedFormGroup; // Déclarez un formulaire de type FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getData();
    this.employeeForm = this.formBuilder.group({
      // Initialisez le formulaire avec les contrôles et les validations
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getData() {
    this.dataService.getEmployeeByID(this.id).subscribe((res) => {
      this.data = res;
      this.employeeForm.patchValue(this.data);
    });
  }
  updateEmployee() {
    if (this.employeeForm.valid) {
      // Vérifiez si le formulaire est valide avant de soumettre les données
      this.dataService.updateData(this.id, this.employeeForm.value).subscribe(
        (res) => {
          // Revenir à la page précédente après la mise à jour
          this.router.navigate(['/crud']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Affichez un message d'erreur ou prenez une autre action appropriée si le formulaire est invalide
    }
  }
}
