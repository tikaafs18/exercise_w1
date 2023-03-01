import { Component, OnInit } from '@angular/core';
import { JobTitle } from '../models/job-title';
import { JobTitleService } from '../services/job-title.services';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobTitleComponent implements OnInit {
  data: JobTitle[] = [];
  jobTitleObj: JobTitle = new JobTitle();
  isAdd = false;
  isEdit = -1;

  constructor(private jobTitleService: JobTitleService) { };

  ngOnInit(): void {
    this.data = [];
    this.jobTitleObj = new JobTitle();
    this.getData();
  }

  getData() {
    this.jobTitleService.getTitle().subscribe((result: JobTitle[]) => (result.map(val => {
      if (!val.isDeleted) this.data.push(val)
    })))
  }

  deleteData(title: JobTitle) {
    this.jobTitleService.deleteTitle(title).subscribe(res => {
      this.ngOnInit();
      alert("Delete success");
    }, err => {
      console.log(err);
      alert("Delete failed");
    })
  }

  addData(title: JobTitle) {
    this.jobTitleService.createTitle(title).subscribe(res => {
      this.ngOnInit();
      alert("Add job title success");
      this.isAdd = false;
    }, err => {
      console.log(err);
      alert("Add job title failed");
    })
  }

  editData(title: JobTitle) {
    this.jobTitleService.editTitle(title).subscribe(res => {
      this.ngOnInit();
      this.isEdit = -1;
      alert("Edit job title success");
    }, err => {
      console.log(err);
      alert("Edit job title failed");
    })
  }

  onEdit(title: JobTitle) {
    this.isEdit = title.idtitle;
    console.log(title)
    this.jobTitleObj = title;
  }
}
