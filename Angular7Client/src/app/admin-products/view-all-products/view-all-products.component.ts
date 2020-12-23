import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/shared/model/car.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarService } from 'src/app/shared/service/car.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  carMark: CarMark;
  car: Car;
  allCarMarks: CarMark[];
  allCars: Car[];
  carMarkService: any;
  setImageValue: any = null;

  
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dataAdmin: DataService,
    public adminService: AdminService,
    public carmarkService: CarMarkService,
    public carService: CarService
    ) { }

    @ViewChild('image') image;
    @ViewChild('mark') mark;
    @ViewChild('carForm') carForm;
    @ViewChild('carMarkForm') carMarkForm;

    
    

  ngOnInit() {
    // this.toastr.success(
    //   'Hello Admin!',
    //    'Greate to see You.',
    //    {
    //     timeOut: 5000,
    //     progressBar: true,
    //    });
    // if(this.adminService.itsAdminSignIn == true) {
      this.resetForm();
      // this.loadAllCars();
      this.loadAllCarMarks(); 
    // } else {
    //   this.router.navigate(['users/admin-sign-in']);
    // }
      }


    resetForm(form?: NgForm) {
      if (form != null) {
        form.reset();
      }
      this.carService.car = {
        Id: '',
        CarName: ''
      };
      this.carmarkService.carMark = {
        Id: null,
        Mark: '',
        Image: null
      };
      this.imageUrl = "/assets/img/default-image.png";
    }

    createCarType() {
      this.router.navigate(['/admin-products/create-car-type']);
    }

    createCarMark() {
      this.router.navigate(['/admin-products/create-car-mark']);
    }

    updateImage(carMark: CarMark) {
      console.log(carMark);
      this.carmarkService.carMark = Object.assign({}, carMark);
      this.router.navigate(['/admin-products/update-image']);
    }

    updateCarMark(carMark: CarMark) {
      console.log(carMark);
      this.carmarkService.carMark = Object.assign({}, carMark);
      this.router.navigate(['/admin-products/update-car-mark']);
    }


        loadAllCarMarks() {  
          this.carmarkService.getAllCarMarks().subscribe(
            result => this.allCarMarks = result,
            error => console.log("Error :: " + error),
            () => console.log('done!', this.allCarMarks)
          )}; 
    
    

          populateMarkForm(carMark: CarMark) {
            this.imageUrl = "http://localhost:52866/image/"+carMark.Image;
            this.carmarkService.carMark = Object.assign({}, carMark);
          }
     
          deleteCarMark(carMark: CarMark) {
            this.carmarkService.removeCarMark(carMark.Id.toString()).subscribe(() => {  
              this.loadAllCarMarks();  
            });  
          }
      
          handleFileInput(file: FileList) {
            this.fileToUpload = file.item(0);
        
            //Show image preview
            var reader = new FileReader();
            reader.onload = (event:any) => {
              this.imageUrl = event.target.result;
            }
            reader.readAsDataURL(this.fileToUpload);
          }

          public createImagePath(serverPath: string) {
            return 'http://localhost:52866/image/'+serverPath;
          } 

        // Proizvođač samo ime CRUD
      //Ovo radi / 
      OnSubmit(form: NgForm) {
        if (this.carService.car.Id == '') {
          this.saveCar(form.value); 
          this.loadAllCars();
        }
        else {
          this.updateCar(this.carService.car);
          this.loadAllCars();
        }
        if (this.carForm) {
          this.carForm.reset();
       }
        //this.router.navigate(['/user-home']);
        }
    
  
      loadAllCars() {  
        this.carService.getAllCars().subscribe(
          result => this.allCars = result,
          error => console.log("Error :: " + error)
          //() => console.log('done!', this.allCars)
        )}; 
  
        saveCar(car: Car) {
          this.carService.saveCar(car).subscribe(res => {
            this.toastr.success(
              'Inserted succesfuly!',
              'New record in Car base',
               {
                timeOut: 5000,
                progressBar: true,
               });
            this.resetForm();
         }
        );
        }  
  
        updateCar(car: Car) {  
          this.carService.putCar(car).subscribe(res => {
            this.toastr.success(
              'Updated succesfuly!',
              'The record in Car base',
               {
                timeOut: 5000,
                progressBar: true,
               });
            this.resetForm();
         }
        );
        } 
    
  
      populateForm(car: Car) {
        this.carService.car = Object.assign({}, car);
      }
  
      deleteCar(car: Car) {
        this.carService.removeCar(car.Id).subscribe(() => {  
          this.loadAllCars();  
        });  
      }
  
      
    signOut() {
      localStorage.removeItem('userToken');
      this.dataAdmin.adminSignInFunction('');
      this.router.navigate(['/users/admin-sign-in']);
    }
  

        

}
