import { Injectable } from '@angular/core';
import { Shop } from '../model/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public shopList: Shop[] = [];

  constructor() { }
}
