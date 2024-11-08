import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { CompanySettingsComponent } from './components/company-settings/company-settings.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'company-settings',
    component: CompanySettingsComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BossRoutingModule { }
