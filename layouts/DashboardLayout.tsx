import { Box, Button, Container, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Logo } from '@/components/Logo'

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Box as="nav">
        <Container maxW="container.xl">
          <HStack h="60px">
            <Logo />
            <Spacer />
            <Button fontWeight={500} variant="ghost" colorScheme="gray">
              Login
            </Button>
          </HStack>
        </Container>
      </Box>
      <Box>{children}</Box>
    </>
  )
}
