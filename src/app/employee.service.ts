
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "./employee.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private url: string = "http://localhost:8080/employee/";
  constructor(private http: HttpClient) {}

  onAddEmployee(employee: EmployeeModel) {
    return this.http.post(`${this.url}add`, JSON.stringify(employee));
  }

  onUpdateEmployee(employee: EmployeeModel) {
    return this.http.put(
      `${this.url}update/${employee.id}`,
      JSON.stringify(employee)
    );
  }

  onGetEmployees() {
    return this.http.get(`${this.url}get-all`);
  }

  onDeleteEmployee(employee: EmployeeModel) {
    return this.http.delete(`${this.url}delete/${employee.id}`);
  }
}
