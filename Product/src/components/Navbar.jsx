import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      
      <AppBar sx={{ background: 'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)' }}>
        <Toolbar>
             <Typography variant='h4' component="div" sx={{ flexGrow: 1, color: '#8e44ad' }}> ProductApp</Typography>
            {/*<Link to='/add'>
                <Button variant='contained' color='secondary'>Add</Button>
            </Link> 
            &nbsp;
            <Link to='/'>
                <Button variant='contained' color='secondary'>View</Button>
            </Link>  */}
            &nbsp;
             <Link to='/log'>
                <Button variant='contained' color='secondary'>Login</Button>
            </Link> 
            &nbsp;
            <Link to='/sign'>
                <Button variant='contained' color='secondary'>SignUp</Button>
            </Link> 
            &nbsp;
           
        </Toolbar>
      </AppBar>
      
      
    </div>
  )
}

export default Navbar