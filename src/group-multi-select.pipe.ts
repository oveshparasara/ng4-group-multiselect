import { Injectable, PipeTransform, Pipe } from '@angular/core';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(value: any, filter, displayKey): any {
    if (filter) {
      return value.filter(item => item[displayKey].indexOf(filter) !== -1);
    }
    return value;
  }
}
