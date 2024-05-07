import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Inject } from '@angular/core';
import { session } from '../utils/session';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = Inject(Router);
  const protectedRoutes: string[] = ['/crud'];
  return protectedRoutes.includes(state.url) && !session
    ? router.navigate(['/'])
    : true;
};
