import { ReactElement, useState } from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'

interface HomeProps {
  children: ReactElement
}

interface carouselCardListProps {
  title: string
  imgSrc: string
  isRelease: boolean
  href: string
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return <Box>teste</Box>
}

export default Home
