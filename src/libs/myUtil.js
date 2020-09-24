// 日期
export function getDate() {
  let dateArr = []
  let today = new Date().getTime();
  for(var i = 0; i < 8; i++) {
    let item = dateFormat(today - i*24*3600*1000)
    dateArr.push(item)
  }

  return dateArr
}

function dateFormat(date) {
  let time = new Date(date)
  let month = (time.getMonth() + 1).toString().padStart(2, '0')
  let day = time.getDate().toString().padStart(2, '0')

  return `${month}月${day}日`
}