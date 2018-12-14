export default {
    name: 'tips',
    effect: 'dark',
    class: "tipsClass",
    forms: {
        pid: {
            content: "说明：<br/><br/>1、编号为数字且唯一。<br/><br/>2、已使用编号：{params}",
            placement: "right"
        },
        name: {
            content: "说明：<br/><br/>活动的名称。",
            placement: "right"
        },
        en: {
            content: "说明：<br/><br/>活动的标识。",
            placement: "right"
        },
        model: {
            content: "说明：<br/><br/>活动的模版。"
                    +"<br/><br/>支持类型："
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>一般模版</b>：表示修改预约总人数。适用于只按总量显示预约人数。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>抽奖模版</b>：表示以平台为分类分别修改预约人数。适用于按平台显示预约人数。如：安卓预约多少人，IOS预约多少人等。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>兑换模版</b>：表示以来源为分类分别修改预约人数。适用于按来源显示预约人数。如：PC预约多少人，手机预约多少人等。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>问卷模版</b>：表示以势力为分类分别修改预约人数。适用于按势力显示预约人数。如：魔兽，部落预约多少，联盟预约多少等。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>自定义</b>：表示以势力为分类分别修改预约人数。适用于按势力显示预约人数。如：魔兽，部落预约多少，联盟预约多少等。",
            placement: "right"
        },
        status: {
            content: "说明：<br/><br/>开启或关闭活动。<b style='color:green'>灰色关闭，蓝色开启</b>。",
            placement: "right"
        },
        start: {
            content: "说明：<br/><br/>活动的开始时间，可以为空。如果<b style='color:green'>为空</b>表示活动从现在开始到结束时间为止。",
            placement: "right"
        },
        end: {
            content: "说明：<br/><br/>活动的结束时间，可以为空。如果<b style='color:green'>为空</b>表示活动从开始时间一直开启。",
            placement: "right"
        },
        desc: {
            content: "说明：<br/><br/>活动的描述。",
            placement: "right"
        },
        count: {
            content: "说明：<br/><br/>活动的基础可参加次(票)数。如果为-1表示活动可以无限次参加。总的参与次(票)数可受登录、分享影响。",
            placement: "right"
        },
        auth: {
            content: "说明：<br/><br/>活动是否开启审核。审核为人工处理。例如，玩家上传、发表等的内容，需要开启审核。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>否</b>：表示不开启审核。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>是</b>：表示开启审核。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>自动</b>：表示自动判断玩家内容是否合法，适用于图片、视频等接入了鉴黄服务。"
                    ,
            placement: "right"
        },
        sign:  {
            content: "说明：<br/><br/>活动是否开启验证。暂未支持。",
            placement: "right"
        },
        login_mode:  {
            content: "说明：<br/><br/>活动开启的登录模式。不受“频次”的影响。"
                    +"<br/><br/>支持类型："
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>仅登录</b>：表示仅登录，不做其他任何操作。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>需登录才能参与活动</b>：表示必须登录才能参与活动，否则参加不了。适用于有登录需求的活动。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>登录后可获得参与次(票)数</b>：表示登录后可以增加活动次(票)数，增加的次(票)数由“每次登录获得参与次(票)数”、“登录获得参与次(票)数限制”控制，不登录则不增加次(票)数。适用范围：活动期间"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>每天登录后可获得参与次(票)数</b>：同“登录后可获得参与次(票)数”，与其差别在于每天可获得次(票)数。适用范围：活动期间每天登录"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>需登录后参与指定活动后才能参与本活动</b>：表示必须登录，并且关联的指定活动参与成功后，才能参加本活动，否则参加不了。"
                    +"<br/><br/>对参与次(票)数的影响："
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>仅登录</b>：无影响。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>需登录才能参与活动</b>：无影响。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>登录后可获得参与次(票)数</b>：影响。“每次登录获得参与次(票)数” X N <= “登录获得参与次(票)数限制”。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>每天登录后可获得参与次(票)数</b>：影响。“每次登录获得参与次(票)数” X N <= “登录获得参与次(票)数限制”。"
                    +"<br/><br/>&nbsp;&nbsp;<b style='color:red'>需登录后参与指定活动后才能参与本活动</b>：无影响。"
                    
                    ,
            placement: "right"
        },
        share_mode:  {
            content: "说明：<br/><br/>活动是否开启审核。例如，玩家上传、发表等的内容，需要开启审核。",
            placement: "right"
        },
        smode:  {
            content: "说明：<br/><br/>活动是否开启审核。例如，玩家上传、发表等的内容，需要开启审核。",
            placement: "right"
        },
        svalue:  {
            content: "说明：<br/><br/>活动是否开启审核。例如，玩家上传、发表等的内容，需要开启审核。",
            placement: "right"
        }
    }
}