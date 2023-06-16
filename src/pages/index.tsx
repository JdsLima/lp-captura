import { ReactElement, useState } from 'react'
import { NextPage } from 'next'
import {
  Box,
  Button,
  Container,
  Modal,
  Typography,
  useMediaQuery
} from '@mui/material'
import styles from '../styles/pages/home.module.scss'
import Image from 'next/image'
import { ShadowTopBar } from '../components/ShadowTopBar'
import { Form } from '../components/Form'

interface HomeProps {
  children: ReactElement
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box id="back-to-top-anchor" />
        <ShadowTopBar />
        <Box className={styles.backgroundContainer}>
          <div className={styles.overlay}></div>
        </Box>
        <Box className={styles.wrapper} sx={{ py: 10 }}>
          <Container className={styles.container} maxWidth="sm">
            <Box>
              <Image
                src="/images/Feira Construa Já Ginco.svg"
                alt="Background"
                width={isMobile ? 350 : 552}
                height={isMobile ? 44 : 134}
                quality={100}
                priority
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box sx={{ transform: 'translateY(28px)' }}>
                <Image
                  src="/images/Vector.svg"
                  alt="Background"
                  width={isMobile ? 300 : 700}
                  height={47}
                  quality={100}
                  priority
                />
              </Box>
              <Form />
            </Box>
            <Box sx={{ py: 10 }}>
              <Image
                src="/images/REDES SOCIAIS.svg"
                alt="Background"
                width={252}
                height={32}
                quality={100}
                priority
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Home
