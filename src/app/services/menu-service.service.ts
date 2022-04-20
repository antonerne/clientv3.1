import { Injectable } from '@angular/core';
import { HeaderItem, MenuItem, Menus } from '../models/utilities/Menus';
import * as list from './menus.json';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  roles: string[] = [];
  public BaseMenuList: HeaderItem[] = [];
  public MenuList: HeaderItem[] = [];

  constructor() {
    var dlist = (list as any)
    if (dlist.menus) {
      dlist.menus.forEach( (h: HeaderItem) => {
        this.BaseMenuList.push(new HeaderItem(h));
      })
    }
   }

   getMenus(roles: string[])
   {
     var answer: HeaderItem[] = []
     roles.forEach(role => {
        this.BaseMenuList.forEach(head => {
          if (head.hasRole(role)) {
            var found = false;
            for (let i=0; i < answer.length && !found; i++) {
              if (answer[i].title === head.title) {
                var menuitems = head.getMenuItemsForRole(role)
                menuitems.forEach(mi => {
                  var mifound = false;
                  answer[i].menus.forEach(ami => {
                    if (ami.title.toLowerCase() === mi.title.toLowerCase()) {
                      mifound = true;
                    }
                  });
                  if (!mifound) {
                    var mitem = new MenuItem();
                    mitem.title = mi.title;
                    mitem.link = mi.link;
                    answer[i].menus.push(mitem);
                  }
                })
                found = true
              }
            }
            if (!found) {
              var item = new HeaderItem();
              item.title = head.title;
              var menuitems = head.getMenuItemsForRole(role);
              item.menus.push(...menuitems);
              answer.push(item);
            }
          }
        });
     });
     this.MenuList = answer;
   }

   clearMenus() {
     this.MenuList = [];
   }
}
