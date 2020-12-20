import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../shared/model/car.model';
import { CarMark } from '../../shared/model/carMark.model';
import { AdminService } from '../../shared/service/admin.service';
import { CarMarkService } from '../../shared/service/car-mark.service';
import { CarService } from '../../shared/service/car.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  carMark: CarMark;
  car: Car;
  //allCars: Observable<Car[]>;
  allCarMarks: CarMark[];
  allCars: Car[];
  carMarkService: any;
  setImageValue: any = null;
  // selectedImage: any = null;
  //imageFile: File;
  //carMarkImageName: string = "default-image.png";
  //imageName: string = '';

  
  
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
      this.loadAllCars();
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
        Id: '',
        Mark: '',
        Image: null
      };
      this.imageUrl = "/assets/img/default-image.png";
    }
      
        // Proizvođač samo ime + slika CRUD

    //ovo treba da radi i add i edit
    //edit radi samo za ime marke ali ne radi za sliku, ne menja sliku u frameu
        OnSubmitMark(mark, image) {
          if (this.carmarkService.carMark.Id == '') {
            console.log('mark: ', mark.value, 'this.fileToUpload: ', this.fileToUpload);
            this.carmarkService.saveCarMark(mark.value, this.fileToUpload).subscribe(
             data =>{
               console.log('done');
               mark = '';
               image = '';
               this.image.nativeElement.value = null;
               this.imageUrl = "/assets/img/default-image.png";
             }
           );
           this.toastr.success(
            'Save succesfuly!',
            'The record in Carmark base',
             {
              timeOut: 5000,
              progressBar: true,
             });

            //this.saveCar(form.value); 
          }
          else {
            if (this.fileToUpload.name !== '') {
              console.log('this.fileToUpload.name not null: ', this.fileToUpload.name);

              this.carmarkService.putCarMark(this.carmarkService.carMark.Id, mark.value, this.fileToUpload).subscribe(
                data =>{
                  console.log('done');
                  mark = '';
                  image = '';
                  this.image.nativeElement.value = null;
                  this.imageUrl = "/assets/img/default-image.png";
                }
              );
            }
            else {
            // // ovo radi, ali u backendu treba da se uradi put isto kao i post i bice ok
            // //jos treba da se omoguci add-edit button i samo ako bira slika
            // console.log('this.fileToUpload.name null: ', this.fileToUpload.name);
            // //var imageFile = "http://localhost:52866/image/"+carMark.Image;
            // this.carmarkService.putCarMarkNoImage(this.carmarkService.carMark.Id, mark.value).subscribe(
            //   data =>{
            //     console.log('done');
            //     mark = '';
            //     image = '';
            //     this.image.nativeElement.value = null;
            //     this.imageUrl = "/assets/img/default-image.png";
            //   }
            // );


            }
            this.toastr.success(
              'Updated succesfuly!',
              'The record in Carmark base',
               {
                timeOut: 5000,
                progressBar: true,
               });

            //this.updateCarMark(this.carmarkService.carMark.Id, mark.value, this.fileToUpload);
          }
          this.loadAllCarMarks();
        if (this.carMarkForm) {
          this.carMarkForm.reset();
       }

        }


        // oo radi samo add a ne radi edit
      //   OnSubmitMark(mark, image) {
      //   console.log('mark: ', mark.value, 'this.fileToUpload: ', this.fileToUpload);
      //    this.carmarkService.saveCarMark(mark.value, this.fileToUpload).subscribe(
      //     data =>{
      //       console.log('done');
      //       mark = '';
      //       image = '';
      //       this.image.nativeElement.value = null;
      //       this.imageUrl = "/assets/img/default-image.png";
      //     }
      //   );
      //   if (this.carMarkForm) {
      //     this.carMarkForm.reset();
      //  }

        //this.router.navigate(['/user-home']);
        // }

        loadAllCarMarks() {  
          this.carmarkService.getAllCarMarks().subscribe(
            result => this.allCarMarks = result,
            error => console.log("Error :: " + error)
            // () => console.log('done!', this.allCarMarks)
          )}; 
    
    
          // updateCarMark(carMarkID, carMarkMark, image) {
          //   console.log(carMarkID, carMarkMark, image);
          //   this.carmarkService.putCarMark(carMark).subscribe(res => {
          //     this.toastr.success(
          //       'Updated succesfuly!',
          //       'The record in Car base',
          //        {
          //         timeOut: 5000,
          //         progressBar: true,
          //        });
          //     this.resetForm();
          //  }
          // );
          // } 

          populateMarkForm(carMark: CarMark) {
            console.log(carMark);
            this.imageUrl = "http://localhost:52866/image/"+carMark.Image;
            //this.setImageValue = this.imageUrl;
            //console.log(this.imageUrl);
            //carMark.Image = this.imageUrl;
            //this.image.value = this.imageUrl;
            //console.log(this.image.value);
            // var reader = new FileReader();
            // reader.onload = (event:any) => {
            //   this.imageUrl = event.target.result;
            // }
            // reader.readAsDataURL(this.fileToUpload);


            //this.carMarkImageName = this.carMark.Image.name;
            //this.carmarkService.carMark.Mark = carMark.Mark;
            this.carmarkService.carMark = Object.assign({}, carMark);
          }

     
          deleteCarMark(carMark: CarMark) {
            this.carmarkService.removeCarMark(carMark.Id).subscribe(() => {  
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
    this.router.navigate(['/admin']);
  }

}
