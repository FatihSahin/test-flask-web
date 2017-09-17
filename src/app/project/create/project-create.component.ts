import { Component, OnInit } from '@angular/core';
import { Project } from 'models/model';
import { Router } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  project: Project;

  constructor(private api: TestFlaskApiService, private router: Router, private notify: NotificationsService) { 
    this.project = new Project();
  }

  ngOnInit() {
  }

  createProject(): void {
    this.api.insertProject(this.project).subscribe(prj => {
      this.project = prj;
      this.notify.success(
        'Project #' + this.project.projectNo,
        'Successfully saved!',
        {
          showProgressBar: false,
          timeOut: 1500,
          clickToClose: true,
        }
      );
      setTimeout(() => {
        this.router.navigateByUrl("/dashboard");
        window.location.reload();
      }, 750);
    });
  }
}
