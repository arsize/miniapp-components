//获取应用实例
const app = getApp();
Component({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        status: false, //弹窗是否展示
        size: '', //弹窗大小：normal：正常，large:大，small：小
        title: '', //header title
        content: "", //弹窗内容body
        foot: [], //是否显示弹窗foot
        closeicon: false,
        type: 'normal', //弹窗样式类型,最高优先级
        clickBlackType: '',
    },
    pageLifetimes: {
        show: function () {
            let that = this
            that.initChangeStatus()
            // wx.getSystemInfo({
            //     success(res) {
            //         console.log(res.model)
            //         if (res.model.indexOf('iPhone') == -1) {

            //         } else {
            //             if (res.model.indexOf('iPhone 7 Plus') != -1) {
            //                 that.initChangeStatus()
            //             }
            //         }
            //     }
            // })
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
            app.globalData.emitter.removeAllListeners("dialogstatus")
            app.globalData.emitter.on('dialogstatus', listener)
        },
        closedialogconfirm() {
            this.setData({
                status: false
            })
        },
        changestatus(options) {
            let that = this
            let {
                status,
                type,
                size,
                title,
                content,
                clickBlackType,
                foot,
                closeicon
            } = options
            that.setData({
                type: type ? type : 'normal',
                status: status ? status : false,
                closeicon: closeicon ? true : false,
                size: size ? size : 'normal',
                clickBlackType: clickBlackType ? clickBlackType : '',
                title: title ? title : '温馨提示',
                content: content ? content : '',
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
            app.globalData.emitter.removeAllListeners("dialogstatus")
            this.setData({
                status: false
            })
        },
        hideexchangeStatus() {

            this.setData({
                status: false
            })

            if (this.data.clickBlackType == "goBack") {
                wx.navigateBack({
                    delta: 1
                });
            }

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