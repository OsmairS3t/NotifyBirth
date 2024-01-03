export function DateBirth(dateBirth: string) {
  // dateBirth=d/Month
  const arrDate = dateBirth.split('/')
  const dayToday = new Date().getDay()
  const monthToday = new Date().getMonth()
  if ((monthToday+1)=== Number(arrDate[1])) {
    if (dayToday === Number(arrDate[0])) {
      return true;
    } 
  }
  return false;
}

