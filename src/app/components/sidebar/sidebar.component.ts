import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: 'home', class: '' },
    { path: '/data-collection', title: 'Customer Data Collection',  icon:'person', class: '' },
    { path: '/segmentation', title: 'Segmentation',  icon:'pie_chart', class: '' },
    { path: '/ds-usecases', title: 'Data Science Use Cases',  icon:'library_books', class: '' },
    { path: '/unification', title: 'Profile Unification',  icon:'bubble_chart', class: '' },
    { path: '/activation', title: 'Customer Activation',  icon:'trending_up', class: '' },
    { path: '/reporting', title: 'Dashboarding/Reporting',  icon:'analytics', class: '' },
    { path: '/upgrade', title: 'Safe Haven',  icon:'attractions', class: '' },
    /*{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
