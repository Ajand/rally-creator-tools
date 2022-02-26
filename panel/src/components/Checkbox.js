import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    root: {
        width: 35,
        height: 35,
        border: `3px solid black`,
        borderRadius: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    input: {
        width: 23,
        height: 23, 
        border: `3px solid black`,
        borderRadius: 1000,
        transition: '100ms',
        '&:hover': {
            background: '#f5bfd9'
        }
    },
    checked: {
        background: '#DD2A81' ,
        '&:hover': {
            background: '#c72674'
        }
    }
  })
  

const Checkbox = ({checked, onClick}) => {
    const classes = useStyles()

    return (
        <div onClick={onClick} className={classes.root}>
            <div className={`${classes.input} ${checked ? classes.checked : ''}`}></div>
        </div>
    )
}

export default Checkbox