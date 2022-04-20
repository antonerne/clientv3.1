import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from '../models/employee/employee';
import { NewEmployeeResponse } from '../models/utilities/Login';
import { CacheService } from '../services/cache-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CacheService {

  constructor(private http: HttpClient) {
    super();
  }

  updateEmployee(field: string, subfield: string, value: string) {
    var address = '/api/v2/Employees';
    var user = this.getItem<Employee>('user');
    var id = "";
    if (user) {
      id = user.id;
    }
    var req = {"id": id, "field": field, "subfield": subfield,
        "value": value};
    return this.http.put<NewEmployeeResponse>(address, req)
      .pipe(map(resp => {
        this.setItem('user', resp.employee);
      }));
  }
}
