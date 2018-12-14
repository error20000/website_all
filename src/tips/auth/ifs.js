export default {
    name: 'tips',
    effect: 'dark',
    forms: {
        name: {
            content: "说明：<br/><br/>接口的名称。",
            placement: "right"
        },
        app: {
            content: "说明：<br/><br/>接口的所属应用。",
            placement: "right"
        },
        menu: {
            content: "说明：<br/><br/>接口的所属菜单。可以从属多个菜单",
            placement: "right"
        },
        url: {
            content: "说明：<br/><br/>接口的地址。后台数据的访问地址。",
            placement: "right"
        },
        status: {
            content: "说明：<br/><br/>开启或关闭接口。<b style='color:green'>灰色关闭，蓝色开启</b>。",
            placement: "right"
        }
    }
}