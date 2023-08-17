import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormControl,FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
interface User {
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  birthDate: string;
  email: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  
})

export class HomeComponent {
  phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
  userInfo:User[]=[];
  emailFormControl  = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  

  constructor(private http: HttpClient) {}
  name: string = ''; 
  surname: string = '';
  phoneNumber: string = '';
  address: string = '';
  birthDate: string = '';
  email:string='';
  
  submitForm() {
    const user = {
      name:this.name,
      surname:this.surname,
      phoneNumber: this.phoneNumber,
      address: this.address,
      birthDate: this.birthDate,
      email: this.emailFormControl.value||''
    };
    this.addInfo(user);
    this.http.post('https://localhost:7050/api/User/AddUser', user)
    .subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.addInfo(user); 
      }
      
    );
  }


  addInfo(user:any) {
    this.userInfo.push(user);
    console.log(user);
  }
}
  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }





