export function friendlyDate(datsStr) {
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let space = now - time
    let str = ''

    // console.log('1')
    switch (true) {
        //一分钟内显示刚刚
        case space < 60000:
            str = '刚刚'
            break
        //一小时内的显示具体分钟
        case space < 1000 * 3600:
            str = Math.floor(space / 60000) + '分钟前'
            break
        //一天之内的显示小时
        case space < 1000 * 3600 * 24:
            str = Math.floor(space / (1000 * 3600)) + '小时前'
            break
        default:
            str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
    }
    return str
} 