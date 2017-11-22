import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'models/model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {

  private projectKey: string;
  private project: Project;

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private router: Router, private notify: NotificationsService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectKey = params.get('projectKey');
      this.api.getProject(this.projectKey).subscribe(prj => this.project = prj);
    });
  }

  updateProject(): void {
    this.api.updateProject(this.project).subscribe(prj => {
      this.project = prj;
      this.notify.success(
        'Project #' + this.project.projectNo,
        'Successfully updated!',
        {
          showProgressBar: false,
          timeOut: 1500,
          clickToClose: true,
        }
      );
    });
  }
}
