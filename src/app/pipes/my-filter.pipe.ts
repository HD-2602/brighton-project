import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(coursesTab: any, term: string): any {
    if (term == undefined) {
      return coursesTab;
    }
    return coursesTab.filter((obj)=>{
      return (obj.courseName.toLowerCase().includes(term.toLocaleLowerCase()));
    });
  }


}
