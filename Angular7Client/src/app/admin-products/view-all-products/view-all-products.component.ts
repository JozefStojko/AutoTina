import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModelTypeEngine } from 'src/app/shared/model/car-model-type-engine.model';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { Car } from 'src/app/shared/model/car.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { PartType } from 'src/app/shared/model/part-type.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeEngineService } from 'src/app/shared/service/car-model-type-engine.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { CarService } from 'src/app/shared/service/car.service';
import { DataService } from 'src/app/shared/service/data.service';
import { PartTypeService } from 'src/app/shared/service/part-type.service';

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
  allCarTypes: CarType[];
  allPartTypes: PartType[];
  allCarModelTypes: CarModelType[];
  allCarModelTypeEngines: CarModelTypeEngine[];

  

    setImageValue: any = null;

  
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dataAdmin: DataService,
    public adminService: AdminService,
    public carmarkService: CarMarkService,
    public carService: CarService,
    public carTypeService: CarTypeService,
    public carModelTypeService: CarModelTypeService,
    public carModelTypeEngineService: CarModelTypeEngineService,
    public partTypeService: PartTypeService
    
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
      this.loadAllCarTypes(); 
      this.loadAllPartTypes(); 
      this.loadAllCarModelTypes(); 
      }


    resetForm(form?: NgForm) {
      if (form != null) {
        form.reset();
      }
      this.carService.car = {
        Id: null,
        CarName: ''
      };
      this.carmarkService.carMark = {
        Id: null,
        Mark: '',
        Image: null
      };
      this.carTypeService.carType = {
          Id: null,
          CarMarkId: null,
          Model: ''
      };
      this.carModelTypeService.carModelType = {
        Id: null,
        CarModelId: null,
        CarModelTypeName: '',
        YearFrom: null,
        YearTo: null
    };

      this.partTypeService.partType = {
        Id: null,
        ProductType: '',
        ProductTypeImage: null
    };

      this.imageUrl = "/assets/img/default-image.png";
    }



  
    // workig with product
    createProduct() {
      this.router.navigate(['/admin-products/create-product']);
    }


    // Working with CarModelTypeEngine

    loadAllCarModelTypeEngines() {  
      this.carModelTypeEngineService.getAllCarModelTypeEngines().subscribe(
        result => this.allCarModelTypeEngines = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarModelTypeEngines)
      )}; 

      createCarModelTypeEngine() {
        this.router.navigate(['/admin-products/create-car-model-type-engine']);
      }

  
    // Working with Tipovi modela vozila CarModelType

    loadAllCarModelTypes() {  
      this.carModelTypeService.getAllCarModelTypes().subscribe(
        result => this.allCarModelTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarModelTypes)
      )} 
        

      createCarModelType() {
        this.router.navigate(['/admin-products/create-car-model-type']);
      }

      updateCarModelType(carModelType: CarModelType) {
        this.carModelTypeService.carModelType = Object.assign({}, carModelType);
        this.router.navigate(['/admin-products/update-car-model-type']);
    }
  
    deleteCarModelType(carModelType: CarModelType) {
      this.carModelTypeService.removeCarModelType(carModelType.Id).subscribe(() => {  
        this.loadAllCarModelTypes();  
      });  
    }




    //working with product type
    createPartType() {
      this.router.navigate(['/admin-products/create-part-type']);
    }

    loadAllPartTypes() {  
      this.partTypeService.getAllPartTypes().subscribe(
        result => this.allPartTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allPartTypes)
      )}; 

      updatePartTypeImage(partType: PartType) {
        this.partTypeService.partType = Object.assign({}, partType);
        this.router.navigate(['/admin-products/update-part-type-image']);
      }
  

      updatePartType(partType: PartType) {
        this.partTypeService.partType = Object.assign({}, partType);
        this.router.navigate(['/admin-products/update-part-type']);
    }
  
    deletePartType(partType: CarType) {
      this.partTypeService.removePartType(partType.Id.toString()).subscribe(() => {  
        this.loadAllPartTypes();  
      });  
    }

    public createPartTypeImagePath(serverPath: string) {
      return 'http://localhost:52866/image/'+serverPath;
    } 

  



    //working with carType data (car models)

    createCarType() {
      this.router.navigate(['/admin-products/create-car-type']);
    }

    loadAllCarTypes() {  
      this.carTypeService.getAllCarTypes().subscribe(
        result => this.allCarTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarTypes)
      )}; 

  updateCarType(carType: CarType) {
      this.carTypeService.carType = Object.assign({}, carType);
      this.router.navigate(['/admin-products/update-car-type']);
  }

  deleteCarType(carType: CarType) {
    this.carTypeService.removeCarType(carType.Id.toString()).subscribe(() => {  
      this.loadAllCarTypes();  
    });  
  }

  


    //working with carMark data


    createCarMark() {
      this.router.navigate(['/admin-products/create-car-mark']);
    }

    updateImage(carMark: CarMark) {
      this.carmarkService.carMark = Object.assign({}, carMark);
      this.router.navigate(['/admin-products/update-image']);
    }

    updateCarMark(carMark: CarMark) {
      this.carmarkService.carMark = Object.assign({}, carMark);
      this.router.navigate(['/admin-products/update-car-mark']);
    }


        loadAllCarMarks() {  
          this.carmarkService.getAllCarMarks().subscribe(
            result => this.allCarMarks = result,
            error => console.log("Error :: " + error),
            () => console.log('done!', this.allCarMarks)
          )}; 
    
    

          // populateMarkForm(carMark: CarMark) {
          //   this.imageUrl = "http://localhost:52866/image/"+carMark.Image;
          //   this.carmarkService.carMark = Object.assign({}, carMark);
          // }
     
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


   //working with car data

        // Proizvođač samo ime CRUD
      //Ovo radi / 
      OnSubmit(form: NgForm) {
        if (this.carService.car.Id == null) {
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
