import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  occupations = [
    { id: "Cleaner", rating: "Light Manual" },
    { id: "Doctor", rating: "Professional" },
    { id: "Author", rating: "White Collar" },
    { id: "Farmer", rating: "Heavy Manual" },
    { id: "Mechanic", rating: "Heavy Manual" },
    { id: "Florist", rating: "Light Manual" }
  ];




  selectOccupation(evt: any) {
    
  }
  selectedOccupation: string = '';
  name: string = '';
  age: any = '';
  dob: string = '';
  coveramount: any;
  premium: any;
  requiredForm: any;

  numberRegEx = "^[0-9]*$";

  public occupations1?: Occupations[];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    

    this.http.get<Occupations[]>('/premiumcalc/GetOccupations').subscribe(result => {
      this.occupations1 = result;
    }, error => console.error(error));



    this.myForm();
    
  }

  //Create required field validator for name
  myForm() {
    this.requiredForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      dob: ['', Validators.required],
      occupation: ['', Validators.required],
      coveramount: ['', [Validators.required, Validators.pattern(this.numberRegEx)]]
    });
  }
  

  selected(event: any) {



    this.selectedOccupation = event.target.value;
  /*  alert(this.selectedOccupation);*/

    let queryParams = new HttpParams();
    queryParams = queryParams.append("selectedOccupation", this.selectedOccupation);
    queryParams = queryParams.append("age", this.age);
    queryParams = queryParams.append("coveramount", this.coveramount);

 

    this.http.get<number>('/premiumcalc/GetDeathPemiumCalculated', { params: queryParams }).subscribe(result => {
      this.premium = result;
    }, error => console.error(error));


  }
 
  title = 'Premium Calculator';
}

interface Occupations {
  id: string;
  rating: string;
  
}

