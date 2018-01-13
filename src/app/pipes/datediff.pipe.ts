import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datediff'})
export class DateDiff implements PipeTransform {
  transform(value: Date, args: string[]): any {
    if (!value) return value;

//Set the two dates
var expiredate =new Date(value) //Month is 0-11 in JavaScript
var today=new Date()
//Get 1 day in milliseconds
var one_day=1000*60*60*24
 
//Calculate difference btw the two dates, and convert to days
return (Math.ceil((expiredate.getTime()-today.getTime())/(one_day)) + ' days left')
  }
}