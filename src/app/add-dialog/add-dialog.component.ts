import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmployeeModel } from "../employee.model";

@Component({
  templateUrl: "add-dialog.component.html",
  styleUrls: ["./add-dialog.component.css"],
})
export class AddDialogComponent {
  public formData = {
    _id: "",
    name: "",
    email: "",
    dob: null,
    skills: [],
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: EmployeeModel) {
    if (data) {
      this.formData.dob = new Date(data.dob);
      this.formData.email = data.email;
      this.formData.skills = data.skills;
      this.formData.name = data.name;
      this.formData._id = data._id;
    }
    console.log(this.formData);
  }

  onChecked(e, checkedValue) {
    if (e.checked) {
      this.formData.skills.push(checkedValue);
    } else {
      this.formData.skills = this.formData.skills.filter(
        (skill) => skill !== checkedValue
      );
    }

    console.log(this.formData.skills);
  }
}
