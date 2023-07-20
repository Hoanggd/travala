import { useRef } from 'react'
import { useCalendarCell } from 'react-aria'
import {
  isSameMonth,
  CalendarDate,
  isSameDay,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  today,
} from '@internationalized/date'
import { Button, Box, ButtonProps } from '@chakra-ui/react'
import { getLocalTimeZone } from '@internationalized/date'
import { LOCALE } from '@/constants/common'

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: any
  date: CalendarDate
  currentMonth: any
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const { cellProps, buttonProps, isSelected, isInvalid, formattedDate } =
    useCalendarCell({ date, isDisabled: false }, state, ref)

  const isFirstDayOfMonth = date.day === 1
  const isToday = isSameDay(date, today(getLocalTimeZone()))
  const isLastDayOfMonth = date.day === endOfMonth(date).day
  const isStartOfWeek = date.day === startOfWeek(date, LOCALE).day
  const isEndOfWeek = date.day === endOfWeek(date, LOCALE).day
  const isOutsideMonth = !isSameMonth(currentMonth, date)
  const isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected
  const isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected
  const isInRange =
    state.highlightedRange && isSelected && !isSelectionStart && !isSelectionEnd

  const getColorScheme = () => {
    if (isInvalid) {
      return 'red'
    }
    if (isSelected) {
      return 'red'
    }
    return 'gray'
  }

  const getInrangeStyle = (): ButtonProps => {
    if (isInRange) {
      const firstOfMonthStyle: ButtonProps =
        isFirstDayOfMonth && !isStartOfWeek
          ? {
              position: 'relative',
              _before: {
                content: '""',
                position: 'absolute',
                top: 0,
                right: '100%',
                h: 'full',
                w: '100%',
                bgGradient: 'linear(to-l, red.100, transparent)',
              },
            }
          : {}
      const endOfMonthStyle: ButtonProps =
        isLastDayOfMonth && !isEndOfWeek
          ? {
              position: 'relative',
              _before: {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '100%',
                h: 'full',
                w: '100%',
                bgGradient: 'linear(to-r, red.100, transparent)',
              },
            }
          : {}

      return {
        color: 'gray.900',
        bg: 'red.100',
        borderRadius: 0,
        _hover: {
          bg: 'red.200',
          borderRadius: 'sm',
          _before: {
            bg: 'none',
          },
        },
        ...endOfMonthStyle,
        ...firstOfMonthStyle,
      }
    }
    return {
      color:
        variant === 'ghost' ? (isToday ? 'red.500' : 'gray.700') : undefined,
    }
  }

  const variant = isSelected ? 'solid' : 'ghost'

  return (
    <Box as="td" p={0} py="1px" {...cellProps} textAlign="center">
      <Button
        {...buttonProps}
        {...getInrangeStyle()}
        rounded="lg"
        ref={ref}
        hidden={isOutsideMonth}
        transition="none"
        size="sm"
        colorScheme={getColorScheme()}
        variant="ghost"
        w={9}
        h={9}
        fontWeight={500}
        bg={isSelected ? 'red.500' : undefined}
        color={isSelected ? 'white' : getInrangeStyle().color}
        _hover={isSelected ? {} : undefined}
      >
        {formattedDate}
      </Button>
    </Box>
  )
}
