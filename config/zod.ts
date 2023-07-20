import { ERROR_MESSAGE } from '@/constants/errror-message'
import { z } from 'zod'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      if (issue.minimum === 1) {
        return { message: issue.message ?? ERROR_MESSAGE.REQUIRED }
      }
      return {
        message:
          issue.message ??
          ERROR_MESSAGE.TOO_SMALL_STRING(Number(issue.minimum)),
      }
    }
    if (issue.type === 'array') {
      if (issue.minimum <= 1) {
        return { message: issue.message ?? ERROR_MESSAGE.REQUIRED }
      }
    }
    return { message: ctx.defaultError }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string') {
      return {
        message:
          issue.message ?? ERROR_MESSAGE.TOO_BIG_STRING(Number(issue.maximum)),
      }
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') {
      return { message: issue.message ?? ERROR_MESSAGE.INVALID_EMAIL }
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_type) {
    return { message: issue.message ?? ERROR_MESSAGE.REQUIRED }
  }

  return { message: issue.message ?? ctx.defaultError }
}

z.setErrorMap(customErrorMap)
