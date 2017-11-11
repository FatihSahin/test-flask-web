import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'jsonPrettify'})
export class JsonPrettifyPipe implements PipeTransform {
  transform(value: string): string {
    try {
      const obj = JSON.parse(value);
      return JSON.stringify(obj, null, '\t');
    } catch (e)  {
      return value;
    }
  }
}
