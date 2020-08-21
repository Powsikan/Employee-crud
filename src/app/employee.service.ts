import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "./employee.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  onAddEmployee(employee: EmployeeModel) {
    return this.http.post("http://localhost:8080/employee/add", JSON.stringify(employee));
  }

  onUpdateEmployee(employee: EmployeeModel) {
    return this.http.put("http://localhost:8080/employee/update", JSON.stringify(employee));
  }

  onGetEmployees() {
     return this.http.get("http://localhost:8080/employee/get-all");
  }

  onDeleteEmployee(employee: EmployeeModel) {
     return this.http.delete("http://localhost:8080/employee/delete");
  }
}
