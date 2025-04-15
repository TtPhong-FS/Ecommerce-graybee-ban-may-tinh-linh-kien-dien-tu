import { subYears } from 'date-fns'

export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phoneNumber: /^[0-9]+$/
}

export const todayMinus18 = subYears(new Date(), 18)
