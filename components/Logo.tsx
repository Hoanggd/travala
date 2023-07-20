import Image from 'next/image'
import React from 'react'
import NextLink from 'next/link'

export const Logo = () => {
  return (
    <NextLink href="/">
      <Image src="/logo.png" width={142} height={40} alt="logo" />
    </NextLink>
  )
}
