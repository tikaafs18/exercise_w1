import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { JobPosition } from '../models/job-position';
import { EmployeeService } from '../services/employee.services';
import { JobPositionServices } from '../services/job-position.services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isAdd = false;
  isEdit = -1;
  data: Employee[] = [];
  employeeObj: Employee = new Employee();
  dataPosition: JobPosition[] = [];

  constructor(private employeeService: EmployeeService, private jobPositionService: JobPositionServices) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getPosition();
    this.employeeObj = new Employee();
    this.data = [];
    this.dataPosition = [];
  }

  inputJobPosition(jobposition: any) {
    this.dataPosition.forEach((val) => {
      if (val.idposition == jobposition.value) {
        this.employeeObj.position_id = val.idposition;
        this.employeeObj.position_code = val.position_code;
        this.employeeObj.position_name = val.position_name;
        this.employeeObj.title_code = val.title_code;
        this.employeeObj.title_name = val.title_name;
      }
    })
  }

  getEmployee() {
    this.employeeService.getEmployee().subscribe((result: Employee[]) => (this.data = result))
  }

  getPosition() {
    this.jobPositionService.getPosition().subscribe((result: JobPosition[]) => (this.dataPosition = result))
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employeeObj).subscribe(res => {
      this.ngOnInit();
      this.isAdd = false;
      alert("Add employee success");
    }, err => {
      console.log(err)
    })
  }

  onEdit(employee: Employee) {
    this.isEdit = employee.idemployee;
    this.employeeObj = employee;
  }

  cancelEdit() {
    this.isEdit = -1;
    this.employeeObj = new Employee();
  }

  editEmployee() {
    this.employeeService.editEmployee(this.employeeObj).subscribe(res => {
      this.ngOnInit();
      this.isEdit = -1;
      alert("Edit employee success");
    }, err => {
      console.log(err);
      alert("Edit employee failed");
    })
  }

  deleteEmployee(employee:Employee) {
    this.employeeService.deleteEmployee(employee).subscribe(res => {
      this.ngOnInit();
      alert("Delete employee success");
    }, err => {
      console.log(err);
      alert("Delete employee failed");
    })
  }
}
