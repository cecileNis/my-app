import React, { useState } from 'react';
import './App.css';
import { TextField, Button, Card, CardHeader, CardContent, Snackbar, Alert }from '@mui/material';
import { calculateAge } from './module';

const isErrorsValid = (errors) => {
  return Object.values(errors).every((error) => error === '');
}
const isDisabled = (formData) => { 
  return (formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.birthDate === '' || formData.city === '' || formData.postalCode === '') 
};

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const postalCodeRegex = /^(?:[0-8]\d|9[0-8])\d{3}$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\- ']+$/;

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    postalCode: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    isValidField(name, value);
  };

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  

  const isValidField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!nameRegex.test(value)) {
          setErrors({ ...errors, firstName: 'Le prénom est invalide' });
        } else {
          setErrors({ ...errors, firstName: '' });
        } 
        break;
      case 'lastName':
        if (!nameRegex.test(value)) {
          setErrors({ ...errors, lastName: 'Le nom est invalide' });
        } else { 
          setErrors({ ...errors, lastName: '' });
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          setErrors({ ...errors, email: 'L\'email est invalide' });
        } else {
          setErrors({ ...errors, email: '' });
        }
        break;
      case 'birthDate':
        if(calculateAge({birth: new Date(value)}) < 18){
          setErrors({ ...errors, birthDate: 'Vous devez avoir 18 ans ou plus' });
        } else {
          setErrors({ ...errors, birthDate: '' });
        }
        break;
      case 'postalCode':
        if (!postalCodeRegex.test(value)) {
          setErrors({ ...errors, postalCode: 'Le code postal doit être au format français' });
        } else {
          setErrors({ ...errors, postalCode: '' });
        }
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isErrorsValid(errors)) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setAlertSeverity("success");
      setAlertMessage("Form is valid, save in localStorage");
      setOpen(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        postalCode: '',
      });
    } else {
      setAlertSeverity("error");
      setAlertMessage("Error, form is invalid");
      setOpen(true);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ p: 2 }}> 
        <CardHeader title="FORMULAIRE"></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div>
              <TextField
                inputProps={{ "data-testid": "firstName" }}
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={(event) => handleChange(event)}
                error={errors.firstName}
                helperText={errors.firstName}
                sx={{width: '100%', marginBottom: '10px'}}
              />
            </div>
            <div>
              <TextField
                inputProps={{ "data-testid": "lastName" }}
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={(event) => handleChange(event)}
                error={errors.lastName}
                helperText={errors.lastName}
                sx={{width: '100%', marginBottom: '10px'}}
              />
            </div>
            <div>
              <TextField
                inputProps={{ "data-testid": "email" }}
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => handleChange(event)}
                error={errors.email}
                helperText={errors.email}
                sx={{width: '100%', marginBottom: '10px'}}
              />
            </div>
            <div>
              <TextField
                inputProps={{ "data-testid": "birthDate" }}
                label="Date de naissance"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(event) => handleChange(event)}
                error={errors.birthDate}
                helperText={errors.birthDate}
                sx={{width: '100%', marginBottom: '10px'}}
              />
            </div>
            <div>
              <TextField
                inputProps={{ "data-testid": "city" }}
                label="Ville"
                name="city"
                value={formData.city}
                onChange={(event) => handleChange(event)}
                error={errors.city}
                helperText={errors.city}
                sx={{width: '100%', marginBottom: '10px'}}
              />
            </div>
            <div>
              <TextField
                inputProps={{ "data-testid": "postalCode" }}
                label="Code postal"
                name="postalCode"
                value={formData.postalCode}
                onChange={(event) => handleChange(event)}
                error={errors.postalCode}
                helperText={errors.postalCode}
                sx={{width: '100%', marginBottom: '10px'}}
              />
            </div>
            <div className="submitButtonContainer">
              <Button type="submit" disabled={isDisabled(formData)} data-testid ="save" variant="contained" color="primary" sx={{width: '100%'}}>Sauvegarder</Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} data-testid="snackbar">
              <Alert
                onClose={handleClose}
                severity={alertSeverity}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default App;

export { isErrorsValid, isDisabled, emailRegex, postalCodeRegex, nameRegex };