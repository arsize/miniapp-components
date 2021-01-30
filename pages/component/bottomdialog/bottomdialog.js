//获取应用实例
const app = getApp();
Component({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        status: false, //弹窗是否展示
        size: '', //弹窗大小：normal：正常，large:大，small：小
        title: '', //header title
        content: "", //弹窗内容body
        contentstyle: "",
        contentposition: 'center',
        foot: [], //是否显示弹窗foot
        closeicon: false,
        type: 'normal', //弹窗样式类型,最高优先级
        clickBlackType: '',
        marsktap: false//蒙版是否支持点击
    },
    pageLifetimes: {
        show: function () {
            let that = this
            that.initChangeStatus()
        },
        hide() {
        }
    },
    lifetimes: {
        attached: function () {
            this.clearListener()
            this.initChangeStatus()
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    attached: function () {
        this.clearListener()
        this.initChangeStatus()
    },
    detached() {
        this.setData({
            status: false
        })
    },
    methods: {
        initChangeStatus() {
            let that = this
            let listener = function (res) {
                that.changestatus(res)
            }
            let closeAll = function (res) {
                that.setData({
                    status: false
                })
            }
            app.globalData.emitter.removeAllListeners("bottomdialogstatus")
            app.globalData.emitter.on('bottomdialogstatus', listener)
            app.globalData.emitter.removeAllListeners("closeAllDialog")
            app.globalData.emitter.on('closeAllDialog', closeAll)
        },
        closedialogconfirm() {
            this.setData({
                status: false
            })
        },
        changestatus(options) {
            let that = this
            let {
                marsktap,
                contentstyle,
                status,
                type,
                size,
                title,
                content,
                contentposition,
                clickBlackType,
                foot,
                closeicon
            } = options
            that.setData({
                marsktap: marsktap ? marsktap : false,
                contentstyle: contentstyle ? contentstyle : '',
                type: type ? type : 'normal',
                status: status ? status : false,
                closeicon: closeicon ? true : false,
                size: size ? size : 'normal',
                clickBlackType: clickBlackType ? clickBlackType : '',
                title: title ? title : '温馨提示',
                content: content ? content : '',
                contentposition: contentposition ? contentposition : 'center',
                foot: foot && foot.length > 0 ? foot : [{
                    text: '我知道了',
                    cb: () => {
                        that.setData({
                            status: false
                        })
                    }
                }]
            })
        },
        clearListener() {
            app.globalData.emitter.removeAllListeners("bottomdialogstatus")
            app.globalData.emitter.removeAllListeners("closeAllDialog")
            this.setData({
                status: false
            })
        },
        hideexchangeStatus() {

            this.setData({
                status: false
            })

        },
        fb0() {
            this.setData({
                status: false
            })
            this.data.foot[0].cb()

        },
        fb1() {
            this.setData({
                status: false
            })
            this.data.foot[1].cb()

        }

    }
})