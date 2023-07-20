import dayjs from 'dayjs'
import 'dayjs/locale/en-au'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localeData from 'dayjs/plugin/localeData'
import utc from 'dayjs/plugin/utc'

dayjs.extend(localeData)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(utc)
