import { AppBar, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Recipe Vault
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
