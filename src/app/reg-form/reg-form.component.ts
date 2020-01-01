import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegFormService } from '../shared/reg-form.service';
import { MAT_DATE_LOCALE } from '@angular/material';

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
  providers: [RegFormService, {provide: MAT_DATE_LOCALE, useValue: 'en-US'}],
})
export class RegFormComponent implements OnInit {

  gender: Gender[] = [
    {id: 'male-0', value: 'Male'},
    {id: 'female-1', value: 'Female'},
    {id: 'others-2', value: 'Others'}
  ];
  country: Country[] = [
    {id: 'country-0', value: 'India'},
    {id: 'country-1', value: 'USA'},
    {id: 'country-2', value: 'Japan'}
  ];
  
  disabledAgreement: boolean = true;
  changeCheck(event){
    this.disabledAgreement = !event.checked;
  }
  userForm: FormGroup;
  constructor(private RegFormServ: RegFormService) { }
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(),
      dateofbirth: new FormControl('1/11/2020'),
      selectedgender: new FormControl(),
      selectedcountry: new FormControl(),
      phone: new FormControl(),
      bio: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      pass: new FormControl(),
      confirmpass: new FormControl(),
    });
    this.RegFormServ.ngOnInit();
  }
  onSubmit(){
    var dob = (this.userForm.controls['dateofbirth'].value).toString();
    this.RegFormServ.add(this.userForm.value, dob);
    window.location.reload();
  }

}
