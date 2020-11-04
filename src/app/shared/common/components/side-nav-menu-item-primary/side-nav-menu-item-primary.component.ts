import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IMenu } from '@common/models/menu';

@Component({
  selector: 'app-side-nav-menu-item-primary',
  templateUrl: './side-nav-menu-item-primary.component.html',
  styleUrls: ['./side-nav-menu-item-primary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavMenuItemPrimaryComponent implements OnInit {
  @Input() item: IMenu;
  @Input() menuGroupListOpened: boolean;
  @Input() extenalLink: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
