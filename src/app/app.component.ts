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
  isLoading = false;

  constructor(
    private addDialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    // call employee service to fetch all employees
    this.employeeService.onGetEmployees().subscribe(
      (employees: EmployeeModel[]) => {
        ELEMENT_DATA = employees;
        this.dataSource.connect().next(ELEMENT_DATA);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );

    // ELEMENT_DATA = // Fetched response
    // this.dataSource.connect().next(ELEMENT_DATA);
  }

  onAddClick() {
    this.isLoading = true;
    const addMonthlyFeeDialogRef = this.addDialog.open(AddDialogComponent, {
      disableClose: true,
    });

    addMonthlyFeeDialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }
      ELEMENT_DATA.push(data);
      this.employeeService.onAddEmployee(data).subscribe(
        (res) => {
          this.dataSource.connect().next(ELEMENT_DATA);
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    });
  }

  onEditClick(element: EmployeeModel) {
    this.isLoading = true;
    console.log(element);

    const addMonthlyFeeDialogRef = this.addDialog.open(AddDialogComponent, {
      disableClose: true,
      data: element,
    });

    addMonthlyFeeDialogRef.afterClosed().subscribe((data: EmployeeModel) => {
      if (!data) {
        this.isLoading = false;
        return;
      }

      ELEMENT_DATA[ELEMENT_DATA.indexOf(element)] = data;

      // ELEMENT_DATA.unshift(data);
      // call employee service to edit
      this.employeeService.onUpdateEmployee(data).subscribe(
        (res) => {
          this.dataSource.connect().next(ELEMENT_DATA);
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    });
  }

  onDeleteClick(element: EmployeeModel) {
    this.isLoading = true;
    console.log(element);
    ELEMENT_DATA = ELEMENT_DATA.filter(
      (employee) => employee.id !== element.id
    );

    // call employee service to delete
    this.employeeService.onDeleteEmployee(element).subscribe(
      (res) => {
        this.dataSource.connect().next(ELEMENT_DATA);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}

let ELEMENT_DATA: EmployeeModel[] = [];
