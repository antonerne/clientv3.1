export class HeaderItem {
    title: string = "";
    menus: MenuItem[] = [];

    constructor(other?: HeaderItem) {
        this.title = (other) ? other.title : "";
        this.menus = [];
        if (other && other.menus.length > 0) {
            other.menus.forEach(menu => {
                this.menus.push(new MenuItem(menu));
            })
        }
    }

    hasRole(role: string): boolean{
        var answer = false;
        this.menus.forEach(menu => {
            if (menu.hasRole(role)) {
                answer = true;
            }
        });
        return answer;
    }

    getMenuItemsForRole(role: string): MenuItem[] {
        var answer: MenuItem[] = [];
        this.menus.forEach(menu => {
            if (menu.hasRole(role)) {
                var item = new MenuItem();
                item.title = menu.title;
                item.link = menu.link;
                answer.push(item);
            }
        });
        return answer
    }
}

export class MenuItem {
    title: string = "";
    link: string = "";
    roles: string[] = [];

    constructor(other?: MenuItem) {
        this.title = (other) ? other.title : "";
        this.link = (other) ? other.link : "";
        this.roles = [];
        if (other) {
            other.roles.forEach(role => {
                this.roles.push(role);
            })
        }
    }

    hasRole(role: string): boolean {
        var answer = false;
        this.roles.forEach(r => {
            if (role.toLowerCase() === r.toLowerCase()) {
                answer = true;
            }
        });
        return answer;
    }
}

export class Menus {
    menus: HeaderItem[] = [];
}