import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorted',
  standalone: true,
  pure: true
})
export class SortedPipe implements PipeTransform {

  transform(value: number[]): number[] {
    return [...value].sort((a,b) => a-b);
  }

}
