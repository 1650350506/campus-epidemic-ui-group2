export default {
  init: function () {
    const AK = 'CDueQBNhXZXXTrAZhLr0CxKvGUUWlvyT' // 你的AK
    const BMap_URL = `https://api.map.baidu.com/api?v=2.0&ak=${
      AK}&s=1&callback=onBMapCallback`
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if (typeof BMap !== 'undefined') {
        resolve(BMap)
        return true
      }
      // 百度地图异步加载回调处理
      window.onBMapCallback = function () {
        resolve(BMap)
      }
      const getCurrentCityName = function () {
        return new Promise(function (resolve, reject) {
          const myCity = new BMap.LocalCity()
          myCity.get(function (result) {
            resolve(result.name)
          })
        })
      }
      // 插入script脚本
      const scriptNode = document.createElement('script')
      // eslint-disable-next-line no-undef
      scriptNode.setAttribute(type, 'text/javascript')
      scriptNode.setAttribute('src', BMap_URL)
      document.body.appendChild(scriptNode)
    })
  }
}
