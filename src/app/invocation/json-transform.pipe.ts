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

@Pipe({name: 'jsonParser'})
export class JsonParserPipe implements PipeTransform {
  transform(value: string): object {
    try {
      const obj = JSON.parse(value);
      return obj;
    } catch (e)  {
      return null;
    }
  }
}
