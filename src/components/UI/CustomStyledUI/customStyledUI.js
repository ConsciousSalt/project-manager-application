import {styled} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const CustomTextField = styled(TextField)({
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(173.72deg, rgba(196, 196, 196, 0.75) 5.83%, rgba(196, 196, 196, 0.589844) 83.56%, rgba(196, 196, 196, 0) 122.42%)',
    width: '80%'
});

export const CustomButton = styled(Button)({
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(173.72deg, rgba(196, 196, 196, 0.75) 5.83%, rgba(196, 196, 196, 0.589844) 83.56%, rgba(196, 196, 196, 0) 122.42%)',
    height: '3.38em',
    borderRadius: '0'
});