const app = getApp();
let animation = wx.createAnimation({});
let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = '../../img/scan_di.mp3'
Page({
    data: {
        flash: "off",
        animation: '',
        imgposition: -420,
        timer: null,
        istrue: false,
    },
    onShow() {
        // this.donghua()
    },
    onHide() {
        clearInterval(this.timer)
    },
    onUnload() {
        clearInterval(this.timer)
    },
    openlight() {
        this.setData({
            flash: this.data.flash == 'on' ? 'off' : 'on'
        })
    },
    donghua() {
        let m = true
        let that = this
        let timer = setInterval(function () {
            if (m) {
                animation.translateY(250).step({ duration: 1300 })
                m = !m
            } else {
                animation.translateY(10).step({ duration: 1300, transformOrigin: '50% 50% 0' })
                m = !m
            }
            that.setData({
                animation: animation.export()
            })

        }.bind(this), 1300)

        this.setData({
            timer: timer
        })
    },
    // 初始化完成
    initdone() {
        this.setData({
            istrue: true
        })
    },
    error() {
        wx.showToast({
            title: '摄像头未授权',
            icon: 'none'
        });
    },
    // 输入电柜id
    inputid() {
        wx.redirectTo({
            url: '/pages/transitInput/transitInput',
        })
    },
    // scan
    scansuccess(e) {
        let qrcode = e.detail.result
        innerAudioContext.play()
        this.getResult(qrcode)
    },
    getResult(qrcode) {

    },
});
