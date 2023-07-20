import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { Logo } from '@/components/Logo'
import Form from '@/components/Form'
import LabeledTextField from '@/components/LabeledTextField'
import { z } from 'zod'
import { useLogin, useLogout, useUser } from '@/pages-modules/auth/hooks'
import NextLink from 'next/link'

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const login = useLogin()
  const logout = useLogout()
  const toast = useToast()
  const user = useUser()

  return (
    <>
      <Box as="nav" shadow="sm">
        <Container maxW="container.xl">
          <HStack h="70px" spacing={6}>
            <Logo />
            <Box pos="relative">
              <Link
                color="gray.700"
                _hover={{ color: 'gray.900' }}
                as={NextLink}
                href="/pricing"
                fontWeight={500}
                pr={2}
              >
                Pricing
              </Link>
              <Badge pos="absolute" colorScheme="blue" fontWeight={500}>
                {user.data?.plan}
              </Badge>
            </Box>
            <Spacer />
            {user.data?.name ? (
              <HStack>
                <Button
                  onClick={() => logout.mutate()}
                  fontWeight={500}
                  variant="ghost"
                  colorScheme="gray"
                >
                  Logout
                </Button>
                <Avatar name="A" bg="green.500" />
              </HStack>
            ) : (
              <Button
                onClick={onOpen}
                fontWeight={500}
                variant="ghost"
                colorScheme="gray"
              >
                Login
              </Button>
            )}
          </HStack>
        </Container>
      </Box>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody minH="400px">
            <Form
              schema={z.object({
                username: z.string().min(1),
                password: z.string().min(1),
              })}
              onSubmit={async (data) => {
                if (data.username === 'admin' && data.password === 'admin') {
                  login.mutate({ name: 'admin' })
                  onClose()
                } else {
                  toast({
                    status: 'error',
                    description: 'The username or password is incorrect',
                    position: 'top',
                  })
                }
              }}
            >
              <VStack py={10} spacing={5}>
                <img src="/favicon.png" />
                <Text fontWeight={600} fontSize="3xl">
                  Welcome to Travala
                </Text>
                <LabeledTextField
                  placeholder="admin"
                  name="username"
                  label="Username"
                />
                <LabeledTextField
                  placeholder="admin"
                  name="password"
                  label="Password"
                  type="password"
                />
                <Button type="submit" w="full" size="lg" fontSize="md">
                  Login
                </Button>
              </VStack>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box>{children}</Box>
    </>
  )
}
