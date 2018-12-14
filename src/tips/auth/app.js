export default {
    name: 'tips',
    effect: 'dark',
    forms: {
        pid: {
            content: "说明：<br/><br/>1、编号为数字且唯一。<br/><br/>2、已使用编号：{params}",
            placement: "right"
        },
        name: {
            content: "说明：<br/><br/>应用的名称。",
            placement: "right"
        },
        secretKey: {
            content: "说明：<br/><br/>应用的密钥。可以输入任何你想要的密钥，<b style='color:green'>最大长度32位</b>。"
                +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>重置</b>：重置按钮不会修改应用密码，需要点击提交才会更改。",
            placement: "right"
        },
        domain: {
            content: "说明：<br/><br/>应用的域名。",
            placement: "right"
        },
        icon: {
            content: "说明：<br/><br/>应用的图标。可以填css类名。",
            placement: "right"
        },
        status: {
            content: "说明：<br/><br/>开启或关闭应用。<b style='color:green'>灰色关闭，蓝色开启</b>。",
            placement: "right"
        }
    }
}