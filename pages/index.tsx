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
  Image,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'

import { CiSearch } from 'react-icons/ci'
import { GoPeople, GoCalendar } from 'react-icons/go'
import { BiMap } from 'react-icons/bi'
import { range } from 'lodash'
import { AiFillStar, AiOutlineWifi } from 'react-icons/ai'
import { IoMdAirplane } from 'react-icons/io'
import { RiServiceLine } from 'react-icons/ri'
import { CheckIcon } from '@chakra-ui/icons'
import { useUser } from '@/pages-modules/auth/hooks'
import { formatCurrency } from '@/libs/common'

const hotels = [
  {
    name: 'Wild Lotus Hotel Apartment 2',
    rating: 4,
    address: 'Tay Ho, Hanoi',
    price: 457,
    image:
      'https://cf.bstatic.com/xdata/images/hotel/square600/467681103.webp?k=16732d2d56d5071b98210075021d19f2cadab2367bb5234e2606650e7c221578&o=',
  },
  {
    name: 'Le Foyer Hote',
    rating: 5,
    address: '1 Thanh nien Road, ba dinh',
    price: 127,
    image:
      'https://i.travelapi.com/lodging/1000000/120000/114500/114496/e54abb9a_b.jpg',
  },
  {
    name: 'Le Foyer Hote',
    rating: 5,
    address: '1 Thanh nien Road, ba dinh',
    price: 127,
    image:
      'https://i.travelapi.com/lodging/1000000/120000/114500/114496/e54abb9a_b.jpg',
  },
  {
    name: 'Le Foyer Hote',
    rating: 5,
    address: '1 Thanh nien Road, ba dinh',
    price: 127,
    image:
      'https://i.travelapi.com/lodging/1000000/120000/114500/114496/e54abb9a_b.jpg',
  },
  {
    name: 'Le Foyer Hote',
    rating: 5,
    address: '1 Thanh nien Road, ba dinh',
    price: 127,
    image:
      'https://i.travelapi.com/lodging/1000000/120000/114500/114496/e54abb9a_b.jpg',
  },
  {
    name: 'Le Foyer Hote',
    rating: 5,
    address: '1 Thanh nien Road, ba dinh',
    price: 127,
    image:
      'https://i.travelapi.com/lodging/1000000/120000/114500/114496/e54abb9a_b.jpg',
  },
]

const Page: NextPageWithLayout = () => {
  const user = useUser()

  return (
    <Box>
      <Box bg="blue.900">
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
                <Input
                  placeholder="Search for Places or Properties"
                  variant="unstyled"
                  h="40px"
                  fontSize="md"
                  _placeholder={{ fontSize: 'md', color: 'gray.400' }}
                />
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
      <Box bg="gray.100">
        <Container maxW="container.lg" py={14}>
          <Stack spacing={8}>
            {hotels.map((hotel) => {
              const price = hotel.price
              const priceDiscount = (user.data?.discount || 0) * price

              return (
                <HStack
                  bg="white"
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="0px 6px 12px rgba(0,0,0,0.05)"
                  alignItems="stretch"
                >
                  <Image
                    w="300px"
                    h="200px"
                    objectFit="cover"
                    src={hotel.image}
                  />
                  <Stack flex={1} fontSize="sm" py={6} px={4} spacing={1}>
                    <HStack>
                      <Text fontSize="xl" fontWeight={700}>
                        {hotel.name}
                      </Text>
                      <HStack spacing={0.5}>
                        {range(0, hotel.rating).map((item) => (
                          <Icon color="yellow.400" as={AiFillStar} />
                        ))}
                      </HStack>
                    </HStack>
                    <HStack spacing={1} color="gray.600">
                      <Icon as={BiMap} />
                      <Text>{hotel.address}</Text>
                    </HStack>
                    <HStack>
                      <CheckIcon color="blue.400" />
                      <Text>Sign up or log in for US$3.15 AVA cashback</Text>
                    </HStack>
                    <HStack>
                      <HStack>
                        <CheckIcon color="blue.400" />
                        <Text>Free Cancellation</Text>
                      </HStack>
                      <HStack>
                        <CheckIcon color="blue.400" />
                        <Text>Breakfast</Text>
                      </HStack>
                    </HStack>
                    <Spacer />
                    <HStack fontSize="lg" spacing={4} color="gray.600">
                      <Icon as={AiOutlineWifi} />
                      <Icon as={IoMdAirplane} />
                      <Icon as={RiServiceLine} />
                    </HStack>
                  </Stack>
                  <Stack w="200px" p={6}>
                    <Box textAlign="right" lineHeight={1.3}>
                      {!priceDiscount && (
                        <Text fontSize="2xl" fontWeight={700} color="blue.500">
                          {formatCurrency(price)}
                        </Text>
                      )}
                      {!!priceDiscount && (
                        <>
                          <Text
                            fontSize="md"
                            fontWeight={700}
                            color="gray.500"
                            textDecor="line-through"
                          >
                            {formatCurrency(price)}
                          </Text>
                          <Text
                            fontSize="2xl"
                            fontWeight={700}
                            color="blue.500"
                          >
                            {formatCurrency(price - priceDiscount)}
                          </Text>
                        </>
                      )}
                    </Box>
                    <Spacer />
                    <Button borderRadius="md">Choose room</Button>
                  </Stack>
                </HStack>
              )
            })}
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
