import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceRange'
})
@Injectable()
export class PriceRangePipe implements PipeTransform {
  transform(flightRoute: any, priceLimit: number): any {
    if (!priceLimit) return flightRoute;

    return flightRoute.map(route => {
      if (route.price <= priceLimit) {
        return route;
      }
    });
  }
}
