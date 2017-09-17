import { Component, OnInit } from '@angular/core';
import { Project } from "models/model";
import { TestFlaskApiService } from "app/services/test-flask-api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };

  projects: Project[];

  constructor(private api: TestFlaskApiService) {

  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.api.getProjects().subscribe(data => this.projects = data);
  }
}
