import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuthentication, startLoginWithEmailPassword, startGoogleSignIn } from '../../features/auth/authThunk'
import { useDispatch, useSelector } from 'react-redux'

export const LoginPage = () => {

    const dispatch = useDispatch()
    const { status } = useSelector( state => state.auth )
    const { error, errorMessage } = useSelector(state => state.auth)

    const isAuthenticating = useMemo( () => status === 'checking', [status] )

    const { email, password, onInputChange } = useForm({
        email: 'abrahamalvarado@devarana.mx',
        password: '123123',
    })

    const onSubmit = ( e ) => {
        e.preventDefault()
        dispatch(startLoginWithEmailPassword({email, password}))
     
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid 
                            item xs={ 12 }
                            display={!!errorMessage ? '' : 'none'}
                        >
                        <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type='submit' variant="contained" fullWidth disabled={isAuthenticating}>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth type='button' onClick={onGoogleSignIn} disabled={isAuthenticating}>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/register"
                        >
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
