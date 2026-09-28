import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard
    implements CanActivate {


    constructor(

        private authService:
            AuthService,

        private router:
            Router

    ) { }


    canActivate(
        route: ActivatedRouteSnapshot
    ): boolean | UrlTree {


        // ========================================
        // Login Check
        // ========================================

        if (
            !this.authService.isLoggedIn()
        ) {

            return this.router.parseUrl(
                '/login'
            );

        }


        // ========================================
        // Get User Role
        // ========================================

        const role =
            this.authService.getRole();


        // ========================================
        // Allowed Roles From Route
        // ========================================

        const allowedRoles =
            route.data?.['roles'] as
            string[];


        // ========================================
        // No Role Restriction
        // ========================================

        if (
            !allowedRoles ||
            allowedRoles.length === 0
        ) {

            return true;

        }


        // ========================================
        // Role Check
        // ========================================

        if (
            role &&
            allowedRoles.includes(role)
        ) {

            return true;

        }


        // ========================================
        // Unauthorized
        // ========================================

        return this.router.parseUrl(
            '/unauthorized'
        );

    }

}