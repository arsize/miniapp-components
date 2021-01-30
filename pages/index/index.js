const app = getApp()
import TouchMoveItem from "../../utils/touchmove";
const touchItem = new TouchMoveItem();

Page({
  data: {
    mapmoveing: false,
    blockHeight: 0, //菜单卡片高度
    touchend: false,//触摸结束

  },
  onLoad: function (options) {
    this.resetHeight()
  },
  gotoscan() {
    wx.navigateTo({
      url: `/pages/cameraScan/cameraScan`,
    });
  },
  // 重置菜单卡片高度
  resetHeight() {
    this.setInitTouchHight(380)
    touchItem.setMaxHeight(380)
    touchItem.setMinHeight(250)
  },
  regionchange(e) {
    if (e.causedBy == "gesture" && e.type == "begin") {
      this.setData({
        mapmoveing: true
      })
    } else if (e.type == "end" || e.causedBy == "scale") {
      this.setData({
        mapmoveing: false
      })
    }
  },

  // 触摸封装
  setInitTouchHight(val) {
    touchItem.setBlockHeight(val)
    this.setData({
      blockHeight: touchItem.getStaticHeight()
    })
  },
  touchstartFn(e) {
    let clientY = e.touches[0].clientY
    touchItem.initTouchY(clientY)
    this.setData({
      touchend: false
    })
    return
  },
  // move触摸计算
  touchmoveFn(e) {
    let clientY = e.touches[0].clientY
    let blockHeight = touchItem.updateHeight(clientY)
    this.setData({
      blockHeight: blockHeight
    })
    return
  },
  touchendFn() {
    touchItem.touchEnd()
    this.setData({
      touchend: true,
      blockHeight: touchItem.newHeight,
    })
    return
  },
  // 重置菜单卡片高度
  resetHeight() {
    this.setInitTouchHight(380)
    touchItem.setMaxHeight(380)
    touchItem.setMinHeight(250)
  },
  showdialog1() {
    let option = {
      status: true,
      closeicon: true,
      content: `这里是弹窗1`,
      foot: [{
        text: '我知道了',
        cb: () => {
        }
      }]
    }
    app.globalData.emitter.emit("dialogstatus", option)
    return

  },
  showdialog2() {
    let option = {
      status: true,
      closeicon: true,
      content: `这里是弹窗2`,
      foot: [{
        text: '我知道了',
        cb: () => {
        }
      }]
    }
    app.globalData.emitter.emit("bottomdialogstatus", option)
    return

  }
});