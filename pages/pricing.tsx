import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Plan, useChangePlan, useUser } from '@/pages-modules/auth/hooks'
import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'

const plans = [
  {
    title: 'Basic',
    description: 'The essentials to provide your best work for clients.',
    price: '$60',
    isPrimary: false,
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics'],
    value: 'basic',
  },
  {
    title: 'Essential',
    description: 'The essentials to provide your best work for clients.',
    price: '$80',
    isPrimary: true,
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    value: 'essential',
  },
  {
    title: 'Premium',
    description: 'The essentials to provide your best work for clients.',
    price: '$100',
    isPrimary: false,
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      'Marketing automations',
      'Custom reporting tools',
    ],
    value: 'premium',
  },
] as const

function Page() {
  const changePlan = useChangePlan()
  const [selected, setSelected] = useState<Plan>()
  const selectedPlan = plans.find((item) => item.value === selected)
  const toast = useToast({ position: 'top' })
  const user = useUser()

  return (
    <Container maxW="container.lg" py={14}>
      <VStack textAlign="center" spacing={4} mb={20}>
        <Text color="blue.500" fontWeight={600}>
          Pricing
        </Text>
        <Text fontSize="5xl" fontWeight={700} lineHeight={1}>
          Plans for teams of all sizes
        </Text>
        <Text maxW="800px" fontSize="lg" color="gray.600">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </Text>
      </VStack>
      <HStack justify="center" spacing={8} alignItems="stretch">
        {plans.map((item) => (
          <Stack
            flexShrink={0}
            w="320px"
            key={item.title}
            borderWidth={item.isPrimary ? '2px' : '1px'}
            p={8}
            borderRadius="3xl"
            spacing={4}
            borderColor={item.isPrimary ? 'blue.500' : 'gray.200'}
          >
            <Text
              fontWeight={600}
              fontSize="lg"
              color={item.isPrimary ? 'blue.500' : 'gray.800'}
            >
              {item.title}
            </Text>
            <Text color="gray.600" fontSize={'sm'}>
              {item.description}
            </Text>
            <HStack spacing={1}>
              <Text fontSize="4xl" fontWeight={700}>
                {item.price}
              </Text>
              <Text fontSize={'sm'} color="gray.600" fontWeight={400} mt={2.5}>
                /month
              </Text>
            </HStack>
            <Button
              borderRadius="md"
              variant={item.isPrimary ? 'solid' : 'outline'}
              onClick={() => {
                if (user.data?.name) {
                  setSelected(item.value)
                } else {
                  toast({ description: 'You Need To Login First' })
                }
              }}
            >
              Buy plan
            </Button>
            <Stack mt={2} spacing={3}>
              {item.features.map((item) => (
                <HStack>
                  <CheckIcon color="blue.400" />
                  <Text fontSize="sm" color="gray.600">
                    {item}
                  </Text>
                </HStack>
              ))}
            </Stack>
          </Stack>
        ))}
      </HStack>
      <Modal
        size="lg"
        isOpen={!!selected}
        onClose={() => setSelected(undefined)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complete your purchase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack py={5} spacing={5}>
              <Divider />
              <HStack fontWeight={600} justify="space-between">
                <Text>{selectedPlan?.title}</Text>
                <Text color="blue.500">{selectedPlan?.price}.00</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>Additional services</Text>
                <Text>$00.00</Text>
              </HStack>
              <HStack fontWeight={600} justify="space-between">
                <Text>TOTAL</Text>
                <Text>{selectedPlan?.price}.00</Text>
              </HStack>
              <Button
                isLoading={changePlan.isLoading}
                onClick={() => {
                  changePlan.mutate(selected, {
                    onSuccess: () => {
                      toast({
                        status: 'success',
                        description: 'Payment Successful!',
                      })
                      setSelected(undefined)
                    },
                  })
                }}
                size="lg"
                fontSize="md"
                borderRadius="full"
              >
                Pay with paypal
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
