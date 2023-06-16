import useMediaQuery from '@mui/material/useMediaQuery'

export const MenuIcon: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:480px)')
  return (
    <svg
      width={isMobile ? '39' : '56'}
      height={isMobile ? '23' : '33'}
      viewBox="0 0 56 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.5"
        width="55.1732"
        height="6.13756"
        rx="3.06878"
        fill="white"
      />
      <rect
        y="13.6121"
        width="55.1732"
        height="6.13756"
        rx="3.06878"
        fill="white"
      />
      <rect
        y="26.7241"
        width="55.1732"
        height="6.13756"
        rx="3.06878"
        fill="white"
      />
    </svg>
  )
}
