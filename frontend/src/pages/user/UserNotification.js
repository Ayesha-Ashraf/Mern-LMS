import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const UserNotification = () => {
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();

    const sendEmail = async () => {
        try {
            await axios.post('/api/send-email', {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            });
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <>
            <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
                <Card sx={{ minWidth: 275, bgcolor: palette.secondary.lightGreen }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="#000" gutterBottom>
                            Notifications Alert!
                        </Typography>
                        <hr style={{ marginBottom: "30px" }} />
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            Dear User, {user && user?.firstName} {user && user?.lastName}
                        </Typography>
                        
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            Check your E-mail: {user && user?.email}
                            <br/> For latest Updates
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                            <CardActions>
                                <Button disableElevation variant='contained' size="large" onClick={sendEmail}>
                                    <Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }}>Click To get Latest Update regarding Courses</Link>
                                </Button>
                            </CardActions>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default UserNotification;
