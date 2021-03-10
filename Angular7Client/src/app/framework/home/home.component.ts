import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModelTypeEngine } from 'src/app/shared/model/car-model-type-engine.model';
import { CarModelType } from 'src/app/shared/model/car-model-type.model';
import { CarType } from 'src/app/shared/model/car-type.model';
import { Car } from 'src/app/shared/model/car.model';
import { CarMark } from 'src/app/shared/model/carMark.model';
import { PartType } from 'src/app/shared/model/part-type.model';
import { Product } from 'src/app/shared/model/product.model';
import { User } from 'src/app/shared/model/user.model';
import { AdminService } from 'src/app/shared/service/admin.service';
import { CarMarkService } from 'src/app/shared/service/car-mark.service';
import { CarModelTypeEngineService } from 'src/app/shared/service/car-model-type-engine.service';
import { CarModelTypeService } from 'src/app/shared/service/car-model-type.service';
import { CarTypeService } from 'src/app/shared/service/car-type.service';
import { CarService } from 'src/app/shared/service/car.service';
import { PartTypeService } from 'src/app/shared/service/part-type.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { ShopService } from 'src/app/shared/service/shop.service';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageOfItems: Array<any>;
  private product: Product;
  public userName: string;
  public itsUserIn: boolean;
  private user: User;
  carMarkSelect: number = null;
  carTypeSelect: number = null;
  carModelTypeSelect: number = null;
  carModelTypeEngineSelect: number = null;
  filterProductByTypeSelect: number = null;
  filteredCarTypes: CarType[];
  filteredPartTypes: PartType[];
  filteredCarModelTypes: CarModelType[];
  filteredCarModelTypeEngines: CarModelTypeEngine[];
  markaValidna: boolean = true;
  tipValidan: boolean = true;
  modelTipValidan: boolean = true;
  allCarMarks: CarMark[];
  allCars: Car[];
  allCarTypes: CarType[];
  allPartTypes: PartType[];
  allCarModelTypes: CarModelType[];
  allCarModelTypeEngines: CarModelTypeEngine[];
  filteredProductsByMark: Product[];
  filteredProductsByMarkType: Product[];
  filteredProductsByMarkTypeModel: Product[];

  

  constructor(
    private router: Router,
    public productService: ProductService,
    private adminService: AdminService,
    private userService: UserService,
    public carmarkService: CarMarkService,
    public carService: CarService,
    public carTypeService: CarTypeService,
    public carModelTypeService: CarModelTypeService,
    public carModelTypeEngineService: CarModelTypeEngineService,
    private partTypeService: PartTypeService,
    private shopService: ShopService

       ) { }

  ngOnInit() {
    this.loadAllProduct();
    this.loadAllCarMarks(); 
    this.loadAllCarTypes(); 
    this.loadAllPartTypes(); 
    this.loadAllCarModelTypes(); 
    this.loadAllCarModelTypeEngines();
    // localStorage.removeItem("shoppingBasket" || "[]");




    if (localStorage.getItem('userName') != ''){
      this.userService.setValue(true);
    }
    if (localStorage.getItem('adminName') != ''){
      this.adminService.setValue(true);
    }

  }

      // page pagination
      onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }

    loadAllCarMarks() {  
      this.carmarkService.getAllCarMarks().subscribe(
        result => this.allCarMarks = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarMarks)
      )}; 

      loadAllCars() {  
        this.carService.getAllCars().subscribe(
          result => this.allCars = result,
          error => console.log("Error :: " + error)
        )}; 

    loadAllCarTypes() {  
      this.carTypeService.getAllCarTypes().subscribe(
        result => this.allCarTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarTypes)
      )}; 

          loadAllPartTypes() {  
      this.partTypeService.getAllPartTypes().subscribe(
        result => this.allPartTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allPartTypes)
      )}; 

    loadAllCarModelTypes() {  
      this.carModelTypeService.getAllCarModelTypes().subscribe(
        result => this.allCarModelTypes = result,
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarModelTypes)
      )} 

    loadAllCarModelTypeEngines() {  
      this.carModelTypeEngineService.getAllCarModelTypeEngines().subscribe(
        result => {
          this.allCarModelTypeEngines = result
        },
        error => console.log("Error :: " + error),
        () => console.log('done!', this.allCarModelTypeEngines)
      )}; 

    //working wit filter by mark, model, engine

    markToNumber(){
      this.carMarkSelect = +this.carMarkSelect;
      this.loadCarTypeIdMarks(this.carMarkSelect); 
      this.filteredProductByMark(this.carMarkSelect); 
      this.markaValidna = false;
      this.tipValidan = true;
      this.modelTipValidan = true;
  
    }
  
   // Choose type using select dropdown
   typeToNumber(){
    this.carTypeSelect = +this.carTypeSelect;
    this.loadCarModelTypeIdModel(this.carTypeSelect); 
    this.filteredProductByModel(this.carTypeSelect); 
    this.tipValidan = false;
    this.modelTipValidan = true;
  }
  
   // Choose model type using select dropdown
   modelTypeToNumber(){
    this.carModelTypeSelect = +this.carModelTypeSelect;
    this.loadCarModelTypeEngineIdModelType(this.carModelTypeSelect); 
    this.filteredProductByModelType(this.carModelTypeSelect); 
    this.modelTipValidan = false;
  }

  modelTypeEngineToNumber(){
    this.carModelTypeEngineSelect = +this.carModelTypeEngineSelect;
    this.filteredProductByModelTypeEngine(this.carModelTypeEngineSelect); 
  }

  loadCarTypeIdMarks(carMarkId: number) {  
    this.carTypeService.getCarMarkIdTypes(carMarkId).subscribe(
      result => this.filteredCarTypes = result,
      error => console.log("Error :: " + error),
      () => console.log('done!', this.allCarTypes)
    )}; 

  loadCarModelTypeIdModel(carModelTypeId: number) {  
  this.carModelTypeService.getCarModelTypeIdModelType(carModelTypeId).subscribe(
  result => this.filteredCarModelTypes = result,
  error => console.log("Error :: " + error),
  () => console.log('done!', this.allCarModelTypes)
  )}; 

  loadCarModelTypeEngineIdModelType(carModelTypeId: number) {  
  this.carModelTypeEngineService.getCarModelTypeEngines(carModelTypeId).subscribe(
    result => this.filteredCarModelTypeEngines = result,
    error => console.log("Error :: " + error),
    () => console.log('done!', this.allCarModelTypeEngines)
    )};

    
    filteredProductByMark(filter: number) {  
      this.productService.productList = this.productService.fixProductList.filter(
        product => product.CarMarkId === filter);
      this.filteredProductsByMark = this.productService.productList;
      } 

    filteredProductByModel(filter: number) {  
      this.productService.productList = this.filteredProductsByMark.filter(
        product => product.CarModelId === filter);
        this.filteredProductsByMarkType = this.productService.productList;
      } 
  
    filteredProductByModelType(filter: number) {  
      this.productService.productList = this.filteredProductsByMarkType.filter(
        product => product.CarModelTypeId === filter);
        this.filteredProductsByMarkTypeModel = this.productService.productList;
      } 

    filteredProductByModelTypeEngine(filter: number) {  
      this.productService.productList = this.filteredProductsByMarkTypeModel.filter(
        product => product.CarModelTypeEngineId === filter);
      } 

      filterReset() {
        this.productService.productList = this.productService.fixProductList;
        this.markaValidna = true;
        this.tipValidan = true;
        this.modelTipValidan = true;
      }
        

  loadAllProduct() {  
    // localStorage.setItem('userIsAdminOrNote', JSON.stringify(false));
    this.productService.getAll().subscribe(
      result => {
        this.productService.productList = result;
        this.productService.fixProductList = result;
      },
      error => console.log("Error :: " + error),
      () => console.log('done!', this.productService.productList)
    )} 



    viewProduct(product: Product) {
      this.productService.product = Object.assign({}, product);
      this.router.navigate(['/products/view-product']);
  }
  
  public createProductImagePath(serverPath: string) {
    return 'http://localhost:52866/image/'+serverPath;
  } 


}
