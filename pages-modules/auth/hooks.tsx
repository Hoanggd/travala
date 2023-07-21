import { sleep } from '@/libs/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type Plan = 'basic' | 'essential' | 'premium' | undefined
export type User = {
  name: string
}

export const useLogin = () => {
  return useMutation(
    async (user: User) => {
      localStorage.setItem('user', JSON.stringify(user))
    },
    {
      onSuccess: () => {
        window.location.reload()
      },
    }
  )
}

export const useLogout = () => {
  return useMutation(
    async () => {
      localStorage.removeItem('user')
    },
    {
      onSuccess: () => {
        window.location.reload()
      },
    }
  )
}

export const useChangePlan = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (plan: Plan) => {
      await sleep(1000)
      localStorage.setItem('plan', plan || '')
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
      },
    }
  )
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = localStorage.getItem('user')
      const plan = localStorage.getItem('plan') as Plan
      const user: User = token ? JSON.parse(token) : undefined

      const discount = (() => {
        if (plan === 'basic') {
          return 0.1
        }
        if (plan === 'essential') {
          return 0.15
        }
        if (plan === 'premium') {
          return 0.2
        }
        return 0
      })()

      return {
        name: user.name,
        plan,
        discount,
      }
    },
  })
}
