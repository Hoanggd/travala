import Form from '@/components/Form'
import LabeledTextField from '@/components/LabeledTextField'
import { Box, Button, Container, Divider, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { setUser } from '@/pages-modules/auth/hooks'

function Login() {
  useEffect(() => {
    const google = (window as any).google

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        setUser(response.credential)
      },
    })
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'filled_blue', size: 'large', width: 370 } // customization attributes
    )
    google.accounts.id.prompt() // also display the One Tap dialog
  }, [])

  return (
    <Container maxW="400px">
      <Form onSubmit={async () => {}}>
        <VStack py={10} spacing={5} maxW="400px">
          <NextLink href="/">
            <img src="/favicon.png" />
          </NextLink>
          <Text fontWeight={600} fontSize="3xl">
            Welcome to Travala
          </Text>
          <LabeledTextField name="email" label="Email" />
          <LabeledTextField name="password" label="Password" />
          <Button w="full" size="md" fontSize="sm" borderRadius="md">
            Login
          </Button>
          <Divider />
          <div id="buttonDiv"></div>
        </VStack>
      </Form>
    </Container>
  )
}

export default Login
