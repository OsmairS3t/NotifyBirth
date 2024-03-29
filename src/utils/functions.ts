
export function DateBirth(dateBirth: string) {
  // dateBirth=d/Month
  const arrDate = dateBirth.split('/')
  const dayToday = new Date().getDate()
  const monthToday = new Date().getMonth()
  if ((monthToday+1) === Number(arrDate[1])) {
    if (dayToday === Number(arrDate[0])) {
      return true;
    } 
  }
  return false;
}

export function ZeroLeft(value: string, size: number) {
  let add = ''
  if (value.length < size) {
    const rest = size - value.length
    for (let i = 1; i <= rest; i++) {
      add += '0'
    }
  }
  return add + value
}


