export default {
    name: 'tips',
    effect: 'dark',
    forms: {
        pid: {
            content: "说明：<br/><br/>1、编号为数字且唯一。<br/><br/>2、已使用编号：{params}",
            placement: "right"
        },
        name: {
            content: "说明：<br/><br/>菜单的名称。",
            placement: "right"
        },
        app: {
            content: "说明：<br/><br/>菜单的所属应用。",
            placement: "right"
        },
        parent: {
            content: "说明：<br/><br/>菜单的父级菜单。",
            placement: "right"
        },
        icon: {
            content: "说明：<br/><br/>菜单的图标。可以填css类名。",
            placement: "right"
        },
        url: {
            content: "说明：<br/><br/>菜单的链接地址。前端页面的访问地址。",
            placement: "right"
        }
    }
}