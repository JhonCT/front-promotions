import { NAV } from './menu.translate';
import { MainService } from './main.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from '@common/models/project';
import { LocalStorageService } from '@core/services/local-storage.service';
import { SessionService } from './auth/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  menuGroupListOpened = true;
  sideNavOpened = true;
  menuGroups = [];
  storeLabel = 'Tienda: ';
  fullName = '';
  profile = '';
  email = '';

  constructor(
    private mainSvc: MainService,
    private sessionSvc: SessionService,
    private lsSVc: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const session = this.sessionSvc.getSession();
    if(!session) {
      this.sessionSvc.clearSession();
    }
    // const menu = this.lsSVc.getItem('XMnAUl', true);
    this.storeLabel = `${session.storeName}`;
    this.fullName = `${session.firstName} ${session.lastName}`;
    // if(menu) {
    //   this.menuGroups = menu;
    //   return;
    // }
    this.mainSvc.privilegies({}).subscribe((result: any) => {
      if (result.success) {
        const user = result.data.item;
        const privileges = result.privilegesInfo;
        const menu = this.refactorMenu(privileges);
        // this.lsSVc.setItem('XMnAUl', menu, true);
        this.menuGroups = menu;
        this.profile = user.profileName;
        this.email = user.email;
        return;
      }
    });
  }

  refactorMenu(privileges) {
    let refactored = [];
    for (const item of Object.entries<any>(privileges) ) {
      refactored.push({
        menuid: item[0],
        name: NAV.TITLE_GROUP[item[0]],
        items: item[1].map(i => this.menuPipeItem(i))
      });
    }
    return refactored;
  }

  menuPipeItem(item) {
    if (item.group == 'REPORT') {
      item.route = 'reports/' + item.route;
    }
    return { icon: item.icon, link: item.route, label: NAV.TITLE[ item.title.split('.')[1]] }
  }

  menuGroupListOpenedChange(opened: boolean) {
    this.menuGroupListOpened = opened;
  }

  sideNavOpenedChange(opened: boolean) {
    this.sideNavOpened = opened;
  }

  onChangeProjectSelected(project: IProject) {
    console.log(project);
  }
}
