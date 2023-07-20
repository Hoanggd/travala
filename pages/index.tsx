import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'

import { CiSearch } from 'react-icons/ci'
import { GoPeople, GoCalendar } from 'react-icons/go'

const Page: NextPageWithLayout = () => {
  return (
    <Box>
      <Box bg="gray.50">
        <Container maxW="container.xl" py={12}>
          <HStack
            h="90px"
            bg="white"
            p={5}
            px={10}
            shadow="0px 5px 16px rgba(0,0,0,0.07)"
            borderRadius="full"
          >
            <SimpleGrid templateColumns="2.5fr 3fr" flex={1}>
              <HStack>
                <Icon as={CiSearch} boxSize="8" color="gray.400" />
                <Text color="gray.400">Search for Places or Properties</Text>
              </HStack>
              <HStack spacing={5}>
                <HStack>
                  <Icon as={GoCalendar} boxSize="7" color="gray.400" />
                  <Box fontSize="sm" lineHeight={1.2}>
                    <Text fontWeight={500}>27 Jul 2023</Text>
                    <Text color="gray.500">Thurday</Text>
                  </Box>
                </HStack>
                <Divider orientation="vertical" h={10} />
                <HStack>
                  <Icon as={GoCalendar} boxSize="7" color="gray.400" />
                  <Box fontSize="sm" lineHeight={1.2}>
                    <Text fontWeight={500}>28 Jul 2023</Text>
                    <Text color="gray.500">Friday</Text>
                  </Box>
                </HStack>
                <Divider orientation="vertical" h={10} />
                <HStack>
                  <Icon as={GoPeople} boxSize="7" color="gray.400" />
                  <Box fontSize="sm" lineHeight={1.2}>
                    <Text fontWeight={500}>2 Adults - 0 Children</Text>
                    <Text color="gray.500">1 room</Text>
                  </Box>
                </HStack>
              </HStack>
            </SimpleGrid>
            <Button w="150px" size="lg" fontSize="md" borderRadius="full">
              Search
            </Button>
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
