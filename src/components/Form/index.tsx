import { useState, useEffect, forwardRef } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import styles from './styles.module.scss'
import regex from '../../../utils/regex'
import styled from '@emotion/styled'
import Lottie from 'react-lottie'
import * as animationData from '../../../public/animations/85744-success.json'
import Image from 'next/image'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const StyledTextField = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '5px'
  }
}))

export const Form: React.FC = () => {
  const [leadName, setLeadName] = useState<string>()
  const [leadEmail, setLeadEmail] = useState<string>()
  const [leadTel, setLeadTel] = useState<string>()
  const [leadWhatsApp, setLeadWhatsApp] = useState<string>()
  const [leadEnderecoObra, setLeadEnderecoObra] = useState<string>()
  const [ondeConheceu, setOndeConheceu] = useState('')
  const [checkbox1, setCheckbox1] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackProps, setSnackProps] = useState({ text: '', type: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setIsPaused(true)
  }
  const handleCloseModal = () => {
    setOpen(false)
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const isMobile = useMediaQuery('(max-width:600px)')

  const handleButtonClick = () => {
    handleFinalize()
    setLeadName('')
    setLeadEmail('')
    setLeadTel('')
    setIsValid(false)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return

    setSnackOpen(false)
  }

  useEffect(() => {
    if (
      leadName &&
      leadEmail &&
      leadWhatsApp &&
      leadEnderecoObra &&
      checkbox1 &&
      ondeConheceu
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [
    leadName,
    leadEmail,
    leadWhatsApp,
    leadTel,
    leadEnderecoObra,
    ondeConheceu,
    checkbox1
  ])

  const handleFinalize = async () => {
    setIsLoading(true)
    try {
      fetch('/api/sendToSpreadSheet', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          Nome: leadName,
          Email: leadEmail,
          WhatsApp: leadWhatsApp,
          Telefone: leadTel,
          EnderecoDeObra: leadEnderecoObra,
          ondeConheceu: ondeConheceu
        })
      }).then(async (res) => {
        if (res.status === 200) {
          setSnackProps({
            text: 'Em breve entraremos em contato 😄',
            type: 'success'
          })
          setSnackOpen(true)
          handleOpen()
        } else {
          setSnackProps({
            text: 'Não foi possível enviar as informações',
            type: 'error'
          })
          setSnackOpen(true)
        }
        setIsLoading(false)
      })
    } catch (error) {
      console.log(error)
      setSnackProps({
        text: 'Não foi possível salvar a simulação',
        type: 'error'
      })
      setSnackOpen(true)
      setIsLoading(false)
    }
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '36px',
    boxShadow: 24,
    py: 10,
    px: 10
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <>
          <Lottie
            options={defaultOptions}
            height={400}
            width={700}
            isStopped={isStopped}
            isPaused={isPaused}
          />
          <Box
            sx={{
              ...style,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Image
                src="/images/[LOGO-SLOGAN] - GRUPO ALEIXO - BRANCO 1.svg"
                alt="Background"
                width={isMobile ? 200 : 300}
                height={isMobile ? 191 : 291}
                quality={100}
                priority
              />
            </Box>
            <h2
              id="child-modal-title"
              style={{
                fontFamily: 'barlow',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#E10600',
                fontSize: isMobile ? '2rem' : '4.3rem',
                lineHeight: 1,
                margin: 0
              }}
            >
              Parabéns,
            </h2>
            <p
              id="child-modal-description"
              style={{
                fontFamily: 'barlow',
                fontStyle: 'italic',
                color: '#BABABA',
                fontSize: isMobile ? '0.7rem' : '1.3rem',
                textAlign: 'center',
                maxWidth: '80%'
              }}
            >
              Em breve disponibilizaremos em seu e-mail a sua tabela de
              desconto!
            </p>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="success"
            >
              Fechar
            </Button>
          </Box>
        </>
      </Modal>
      <div className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.title}>
            <span>CADASTROU, GANHOU!</span>
          </div>
          <div className={styles.form}>
            <form
              action=""
              name="cadastrouGanhou"
              style={{ width: '100%', padding: '0 20px' }}
            >
              <Box className={styles.content}>
                <Box className={styles.formGroup}>
                  <StyledTextField
                    error={false}
                    id="Nome"
                    size="small"
                    fullWidth
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    sx={{
                      '& .MuiFilledInput-root': { borderRadius: 2, px: 1 },
                      '& .MuiFilledInput-root:before, .MuiFilledInput-root:after':
                        {
                          display: 'none'
                        }
                    }}
                    label="Nome Completo"
                    variant="filled"
                  />
                </Box>
                <Box className={styles.formGroup}>
                  <StyledTextField
                    error={false}
                    id="Email"
                    size="small"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiFilledInput-root': { borderRadius: 2, px: 1 },
                      '& .MuiFilledInput-root:before, .MuiFilledInput-root:after':
                        {
                          display: 'none'
                        }
                    }}
                    label="E-mail"
                    variant="filled"
                  />
                </Box>
                <Box className={styles.formGroup}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: 1,
                      gap: 1
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <StyledTextField
                        error={false}
                        id="WhatsApp"
                        size="small"
                        value={leadWhatsApp}
                        onChange={(e) =>
                          setLeadWhatsApp(regex.phone(e.target.value))
                        }
                        fullWidth
                        sx={{
                          '& .MuiFilledInput-root': { borderRadius: 2, px: 1 },
                          '& .MuiFilledInput-root:before, .MuiFilledInput-root:after':
                            {
                              display: 'none'
                            }
                        }}
                        label="WhatsApp"
                        variant="filled"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <StyledTextField
                        error={false}
                        id="telefone"
                        size="small"
                        value={leadTel}
                        onChange={(e) => setLeadTel(e.target.value)}
                        fullWidth
                        sx={{
                          '& .MuiFilledInput-root': { borderRadius: 2, px: 1 },
                          '& .MuiFilledInput-root:before, .MuiFilledInput-root:after':
                            {
                              display: 'none'
                            }
                        }}
                        label="Telefone Fixo (Opcional)"
                        variant="filled"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className={styles.formGroup}>
                  <StyledTextField
                    error={false}
                    id="endereco"
                    size="small"
                    value={leadEnderecoObra}
                    onChange={(e) => setLeadEnderecoObra(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiFilledInput-root': { borderRadius: 2, px: 1 },
                      '& .MuiFilledInput-root:before, .MuiFilledInput-root:after':
                        {
                          display: 'none'
                        }
                    }}
                    label="Endereço da obra"
                    variant="filled"
                  />
                </Box>
                <Box sx={{ textAlign: 'left', width: 1, py: 3 }}>
                  <Typography
                    sx={{
                      color: '#777777',
                      fontFamily: 'Barlow, sans-serif',
                      fontWeight: 'bold'
                    }}
                  >
                    Onde você conheceu o Grupo Aleixo?
                  </Typography>
                  <FormGroup
                    sx={{
                      width: 1,
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      flexWrap: 'wrap'
                    }}
                  >
                    <RadioGroup
                      sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row'
                      }}
                      value={ondeConheceu}
                      onChange={(e) =>
                        setOndeConheceu((e.target as HTMLInputElement).value)
                      }
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <FormControlLabel
                          value="feira-Construa-ja-Ginco"
                          control={
                            <Radio
                              checked={
                                ondeConheceu === 'feira-Construa-ja-Ginco'
                              }
                            />
                          }
                          label="Feira Construa já Ginco"
                        />
                        <FormControlLabel
                          value="Redes-sociais"
                          control={
                            <Radio checked={ondeConheceu === 'Redes-sociais'} />
                          }
                          label="Redes sociais"
                        />
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <FormControlLabel
                          value="Site"
                          control={<Radio checked={ondeConheceu === 'Site'} />}
                          label="Site"
                        />
                        <StyledTextField
                          error={false}
                          id="outro"
                          size="small"
                          fullWidth
                          onChange={(e) => setOndeConheceu(e.target.value)}
                          sx={{
                            '& .MuiFilledInput-root': {
                              borderRadius: 2,
                              px: 1
                            },
                            '& .MuiFilledInput-root:before, .MuiFilledInput-root:after':
                              {
                                display: 'none'
                              }
                          }}
                          label="Outro..."
                          variant="filled"
                        />
                      </Box>
                    </RadioGroup>
                  </FormGroup>
                </Box>
                <Box>
                  <FormGroup
                    sx={{
                      width: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 3
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkbox1}
                            onChange={(e) => setCheckbox1(e.target.checked)}
                          />
                        }
                        label={
                          <Typography fontSize={12}>
                            *Prezamos pela privacidade e a coleta dos seus dados
                            pessoais atenderá as diretrizes da legislação
                            aplicável. Para mais informações, acesse nossa
                            Política de Privacidade.
                          </Typography>
                        }
                      />
                    </Box>
                  </FormGroup>
                </Box>
              </Box>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px 0'
                }}
              >
                <LoadingButton
                  sx={{
                    borderRadius: 2,
                    width: '100%',
                    fontSize: '1.2rem',
                    padding: '2px 16px',
                    fontFamily: 'New Atten bold'
                  }}
                  color="success"
                  variant="contained"
                  disabled={!isValid}
                  onClick={handleButtonClick}
                  onSubmit={(e) => e.preventDefault}
                  loading={isLoading}
                >
                  Finalizar
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
        <Snackbar
          open={snackOpen}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            sx={{ width: '100%' }}
            onClose={handleClose}
            severity={snackProps.type as AlertColor | undefined}
          >
            {snackProps.text}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}
