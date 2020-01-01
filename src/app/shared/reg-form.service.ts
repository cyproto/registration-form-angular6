import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RegFormService {

  register: AngularFireList<any>;
  constructor(private AngFireDB: AngularFireDatabase) { }

  ngOnInit(){
    this.register = this.AngFireDB.list('/users');
  }

  add(data: any, dob): void{
    this.register.push({
      data,
      dob
    });
  }
}
