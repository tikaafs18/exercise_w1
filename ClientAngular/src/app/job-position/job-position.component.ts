import { Component, OnInit } from "@angular/core";
import { JobPosition } from "../models/job-position";
import { JobTitle } from "../models/job-title";
import { JobPositionServices } from "../services/job-position.services";
import { JobTitleService } from "../services/job-title.services";

@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.css']
})

export class JobPositionComponent implements OnInit {
  data: JobPosition[] = [];
  jobPositionObj: JobPosition = new JobPosition();
  isAdd = false;
  isEdit = -1;
  dataJobTitle: JobTitle[] = [];

  constructor(private jobPositionService: JobPositionServices, private jobTitleService: JobTitleService) { };

  ngOnInit(): void {
    this.getPosition();
    this.data = [];
    this.jobPositionObj = new JobPosition();
    this.getTitle();
    this.dataJobTitle = [];
  }


  getTitle() {
    this.jobTitleService.getTitle().subscribe((result: JobTitle[]) => (result.map(val => {
      if (!val.isDeleted) this.dataJobTitle.push(val)
    })))
  }

  getPosition() {
    this.jobPositionService.getPosition().subscribe((result: JobPosition[]) => (this.data = result))
  }

  deletePosition(position: JobPosition) {
    this.jobPositionService.deletePosition(position).subscribe(res => {
      alert('Delete position success');
      this.ngOnInit();
    }, err => {
      console.log(err);
      alert("Delete position failed");
    })
  }

  addPosition() {
    console.log(this.jobPositionObj)
    this.jobPositionService.addPosition(this.jobPositionObj).subscribe(res => {
      alert("Add position success");
      this.ngOnInit();
      this.isAdd = false;
    }, err => {
      console.log(err)
    })
  }

  editPosition() {
    this.jobPositionService.editPosition(this.jobPositionObj).subscribe(res => {
      alert("Edit position success");
      this.ngOnInit();
      this.isEdit = -1;
    }, err => {
      console.log(err);
      alert("Edit position failed");
    })
  }

  onEdit(currentData: JobPosition) {
    this.isEdit = currentData.idposition;
    this.jobPositionObj = currentData;
  }

  cancelEdit() {
    this.ngOnInit();
    this.isEdit = -1;
  }
}