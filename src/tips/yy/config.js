export default {
    name: 'tips',
    effect: 'dark',
    forms: {
        pid: {
            content: "说明：<br/><br/>1、编号为数字且唯一。<br/><br/>2、已使用编号：{params}",
            placement: "right"
        },
        name: {
            content: "说明：<br/><br/>预约的名称。",
            placement: "right"
        },
        start: {
            content: "说明：<br/><br/>预约开始时间，可以为空。如果<b style='color:green'>为空</b>表示预约从现在开始到结束时间为止。",
            placement: "right"
        },
        end: {
            content: "说明：<br/><br/>预约结束时间，可以为空。如果<b style='color:green'>为空</b>表示预约从开始时间一直开启。",
            placement: "right"
        },
        offset: {
            content: "说明：<br/><br/>偏移量类型是指以怎样的方式手动修改预约量。请在“预约偏移量”菜单修改。<b style='color:green'>支持多选</b>。"
                    +"<br/><br/>支持类型："
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>按总计</b>：表示修改预约总人数。适用于只按总量显示预约人数。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>按平台</b>：表示以平台为分类分别修改预约人数。适用于按平台显示预约人数。如：安卓预约多少人，IOS预约多少人等。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>按来源</b>：表示以来源为分类分别修改预约人数。适用于按来源显示预约人数。如：PC预约多少人，手机预约多少人等。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>按势力</b>：表示以势力为分类分别修改预约人数。适用于按势力显示预约人数。如：魔兽，部落预约多少，联盟预约多少等。",
            placement: "right"
        },
        time: {
            content: "说明：<br/><br/>预约人数展示的更新时间。"
                    +"<br/><br/>如："
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>立即更新</b>：表示预约人数会实时更新。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>01：00</b>：表示预约人数会1点更新，1点以前不会更新。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>02：00</b>：表示预约人数会2点更新，2点以前不会更新。"
                    +"<br/><br/>&nbsp;&nbsp;......"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>24：00</b>：表示预约人数会24点更新，24点以前不会更新。",
            placement: "right"
        },
        vcode: {
            content: "说明：<br/><br/>如果启用短信验证码，用户预约时会要求用户输入手机短信验证码，短信验证码通过后，用户才能预约成功。<b style='color:green'>灰色禁用，蓝色开启</b>。",
            placement: "right"
        },
        status: {
            content: "说明：<br/><br/>开启或关闭预约。<b style='color:green'>灰色关闭，蓝色开启</b>。",
            placement: "right"
        }
    }
}