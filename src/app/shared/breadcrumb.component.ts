import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item"
        *ngIf="breadcrumb.label"
        [ngClass]="{active: last}">
      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label}}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label}}</span>
    </li>
  </ng-template>`
})
export class BreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.activatedRoute.root, url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            const crumbs = this.reduceRouteData(routeSnapshot)
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            const labels = this.resolveRouteParam(routeSnapshot, crumbs);
            labels.map(label => {
              this.breadcrumbs.push({
                label: label,
                url: url
              });
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }

  resolveRouteParam(routeSnapshot: ActivatedRouteSnapshot, crumbs: string[]): string[] {
    const labels: string[] = [];
    if (routeSnapshot.data && routeSnapshot.data.title) {
      labels.push(routeSnapshot.data.title);
      return labels;
    }
    if (labels.length === 0 && routeSnapshot.params && routeSnapshot.data.crumbs) {
      crumbs.map((cr: string) => {
        if (cr.indexOf(':') === 0) {
          labels.push(routeSnapshot.params[cr.substr(1, cr.length - 1)]);
        }
        else {
          labels.push(cr);
        }
      });
    }
    return labels.filter(lbl => !!lbl);
  }

  reduceRouteData(routeSnapshot: ActivatedRouteSnapshot): string[] {
    const crumbs: string[] = [];
    let currentSnapshot = routeSnapshot;
    do {
      if (currentSnapshot.data && currentSnapshot.data.crumbs) {
        currentSnapshot.data.crumbs.map(cr => {
          crumbs.push(cr);
        });
      }
      currentSnapshot = currentSnapshot.parent;
    } while (currentSnapshot.parent);

    return crumbs;
  }
}
