import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proxy.conf.json'
})
export class Proxy.conf.jsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
