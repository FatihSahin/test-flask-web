import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class CustomRouteReuseStrategy extends RouteReuseStrategy {
    public shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
    public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
    public shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return null; }
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const name = future.component && (<any>future.component).name;
        return future.routeConfig === curr.routeConfig
        && !(name === 'InvocationComponent' || (name === 'StepComponent' && !future.children.length)); // code smell :)
    }
}
