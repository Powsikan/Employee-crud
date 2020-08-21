import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { EmployeeModel } from "./employee.model";
import { EmployeeService } from "./employee.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  dataSource = new MatTableDataSource<EmployeeModel>(ELEMENT_DATA);
  title = "app";
  displayedColumns: string[] = ["name", "email", "dob", "skills", "actions"];

  constructor(
    private addDialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // call employee service to fetch all employees
    // ELEMENT_DATA = // Fetched response
    // this.dataSource.connect().next(ELEMENT_DATA);
  }

  onAddClick() {
    const addMonthlyFeeDialogRef = this.addDialog.open(AddDialogComponent, {
      disableClose: true,
    });

    addMonthlyFeeDialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }
      ELEMENT_DATA.push(data);
      this.dataSource.connect().next(ELEMENT_DATA);
      this.employeeService.onAddEmployee(data);
    });
  }

  onEditClick(element: EmployeeModel) {
    console.log(element);

    const addMonthlyFeeDialogRef = this.addDialog.open(AddDialogComponent, {
      disableClose: true,
      data: element,
    });

    addMonthlyFeeDialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }
      ELEMENT_DATA.push(data);
      this.dataSource.connect().next(ELEMENT_DATA);
      // call employee service to edit
      this.employeeService.onUpdateEmployee(data);
    });
  }

  onDeleteClick(element: EmployeeModel) {
    console.log(element);
      ELEMENT_DATA = ELEMENT_DATA.filter(employee => employee._id !== element._id);
      this.dataSource.connect().next(ELEMENT_DATA);
    // call employee service to delete
    this.employeeService.onUpdateEmployee(element);
  }
}

let ELEMENT_DATA: EmployeeModel[] = [
  // Sample data for development
  {
    _id: "unique_id_1",
    email: "jstrfaheem065@gmail.com",
    name: "Mohamed Faheem",
    dob: "Tue Aug 18 2020 00:00:00 GMT+0530 (India Standard Time)",
    skills: ["HTML", "CSS", "JavaScript", "HTML", "CSS", "JavaScript"],
  },
  {
    _id: "unique_id_2",
    email: "jstrfaheem065@gmail.com",
    name: "Mohamed Faheem",
    dob: "Tue Aug 18 2020 00:00:00 GMT+0530 (India Standard Time)",
    skills: ["HTML", "CSS", "JavaScript", "HTML", "CSS", "JavaScript"],
  },
];
