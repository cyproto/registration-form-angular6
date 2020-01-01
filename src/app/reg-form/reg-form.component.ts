import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { RegFormService } from '../shared/reg-form.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Gender {
  id: string;
  value: string;
}

export interface Country {
  id: string;
  value: string;
}

@Component({
  selector: 'app-reg-form',
  templateUrl: 'reg-form.component.html',
  styleUrls: ['reg-form.component.css'],
  providers: [RegFormService, { provide: MAT_DATE_LOCALE, useValue: 'en-US' }],
})
export class RegFormComponent implements OnInit {

  gender: Gender[] = [
    { id: 'male-0', value: 'Male' },
    { id: 'female-1', value: 'Female' },
    { id: 'others-2', value: 'Others' }
  ];

  country: Country[] = [
    { id: 'country-0', value: 'India' },
    { id: 'country-1', value: 'USA' },
    { id: 'country-2', value: 'Japan' }
  ];

  minDate = new Date(1920, 0, 1);
  maxDate = new Date(2020, 0, 1);

  disabledAgreement: boolean = true;
  changeCheck(event) {
    this.disabledAgreement = !event.checked;
  }
  public fname: String;
  userForm: FormGroup;
  constructor(private RegFormServ: RegFormService) { }
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dateofbirth: new FormControl('1/11/2020', Validators.required),
      selectedgender: new FormControl('', Validators.required),
      selectedcountry: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl(),
      pass: new FormControl('', Validators.required),
      confirmpass: new FormControl('', Validators.required),
    });
    this.RegFormServ.ngOnInit();
  }

  onSubmit() {
    if (this.userForm.controls['pass'].value == this.userForm.controls['confirmpass'].value) {
      var dob = (this.userForm.controls['dateofbirth'].value).toString();
      this.RegFormServ.add(this.userForm.value, dob);
      window.location.reload();
    }
  }

}
