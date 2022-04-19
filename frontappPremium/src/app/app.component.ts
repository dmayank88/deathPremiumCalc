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
  age: any;
  diffDays: any;
  dob: any;
  coveramount: any;
  premium: any;
  requiredForm: any;

  numberRegEx = "^[0-9]*$";

  public occupations1?: Occupations[];


  public IsDateofBirthInFuture() {

}

  public CalculateAge(): void {
    if (this.dob) {

      var currentDate = new Date();
      var dobDate = new Date(this.dob); 
      var currentMonth = currentDate.getMonth();
      var dobMonth = dobDate.getMonth();



      if (new Date(this.dob) > currentDate) {
        alert("Date of birth can not be in futrue!!!");
        this.dob='';
        //alert(this.selectedOccupation);
        return;
      }
      //get years 
      var yearAge = (currentDate.getFullYear() - dobDate.getFullYear());

      //get months  
      if (currentMonth >= dobMonth)
        //get months when current month is greater  
        var monthAge = currentMonth - dobMonth;
      else {
        yearAge--;
        var monthAge = 12 + currentMonth - dobMonth;
      }

       var AgeInMonths = currentDate.getMonth() - dobDate.getMonth();



      //get days  
      if (currentDate >= dobDate)
        //get days when the current date is greater  
        var dateAge = (currentDate.getDate() - dobDate.getDate());
      else {
        monthAge--;
        dateAge = 31 + (currentDate.getDate() - dobDate.getDate());

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }  


      this.age = yearAge + " Years " + monthAge + " Months " + dateAge + " Days ";


     
      

     

    }
  }

  public getDaydiff() {

   
    var currentDate = new Date();
    var dobDate = new Date(this.dob); 
    var diff = Math.abs(currentDate.getTime() - dobDate.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    //alert(this.diffDays);
    return this.diffDays;
}

  constructor(private http: HttpClient, private fb: FormBuilder) {
    

    this.http.get<Occupations[]>('/premiumcalc/GetOccupations').subscribe(result => {
      this.occupations1 = result;
    }, error => console.error(error));



    this.myForm();
    
  }

  //Create required field validator
  myForm() {
    this.requiredForm = this.fb.group({
      name: ['', Validators.required],
      age: [],
      dob: ['', Validators.required],
      occupation: ['', Validators.required],
      coveramount: ['', [Validators.required, Validators.pattern(this.numberRegEx)]]
    });
  }
  

  selected(event: any) {

    if (this.requiredForm.invalid) {
      this.requiredForm.get('name').markAsTouched();
      this.requiredForm.get('dob').markAsTouched();
      this.requiredForm.get('coveramount').markAsTouched();
      this.requiredForm.get('occupation').markAsTouched();
      this.requiredForm.get('age').markAsTouched();
      return;
    }



    this.selectedOccupation = event.target.value;
  /*  alert(this.selectedOccupation);*/

    let queryParams = new HttpParams();
    queryParams = queryParams.append("selectedOccupation", this.selectedOccupation);
    queryParams = queryParams.append("diffDays",
      this.getDaydiff());
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

