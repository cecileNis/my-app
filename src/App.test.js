import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach (() => {
  render( <App />);
  fireEvent.change(screen.getByLabelText('Prénom'), { 
    target: { value: 'Cécile' } 
  });
  fireEvent.change(screen.getByLabelText('Nom'), { 
    target: { value: 'Niess' } 
  });
  fireEvent.change(screen.getByLabelText('Email'), { 
    target: { value: 'test@test.fr' } 
  });
  fireEvent.change(screen.getByLabelText('Date de naissance'), { 
    target: { value: '1991-07-26' } 
  });
  fireEvent.change(screen.getByLabelText('Ville'), { 
    target: { value: 'Saint-laurent-du-var' } 
  });
  fireEvent.change(screen.getByLabelText('Code postal'), { 
    target: { value: '06700' } 
  });
});

// test sur la désactivation du bouton si les champs ne sont pas remplis
test('should return false when field is empty', () => {
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  const snackbar = screen.getByTestId('snackbar');
  expect(snackbar).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

//test sur la desactivation du bouton si un des champs n'est pas remplis
//test sur le Prénom
test('should return true when fiel firtsname is empty', () => {
  fireEvent.change(screen.getByLabelText('Prénom'), { 
    target: { value: '' } 
  });
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
//test sur le Nom
test('should return true when fiel lastname is empty', () => {
  fireEvent.change(screen.getByLabelText('Nom'), { 
    target: { value: '' } 
  });
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
//test sur le Mail
test('should return true when fiel email is empty', () => {
  fireEvent.change(screen.getByLabelText('Email'), { 
    target: { value: '' } 
  });
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
//test sur la Date de naissance
test('should return true when fiel birthDate is empty', () => {
  fireEvent.change(screen.getByLabelText('Date de naissance'), { 
    target: { birth: new Date('') } 
  });
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
//test sur la Ville
test('should return true when fiel city is empty', () => {
  fireEvent.change(screen.getByLabelText('Ville'), { 
    target: { value: '' } 
  });
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});
//test sur le Code postal
test('should return true when fiel postalCode is empty', () => {
  fireEvent.change(screen.getByLabelText('Code postal'), { 
    target: { value: '' } 
  });
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
});


// La sauvegarde dans le local storage et le toaster de succès, avec champs vidés
test('should save in local storage a success', async () =>{
  const lastNameTextField = screen.getByLabelText('Nom');
  const firstNameTextField = screen.getByLabelText('Prénom');
  const emailTextField = screen.getByLabelText('Email');
  const birthDateTextField = screen.getByLabelText('Date de naissance');
  const cityTextField = screen.getByLabelText('Ville');
  const zipCodeTextField = screen.getByLabelText('Code postal');
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Form is valid, save in localStorage')).toBeInTheDocument();
    expect(localStorage.getItem("formData")).not.toBeNull();
    expect(lastNameTextField.value).toBe("");
    expect(firstNameTextField.value).toBe("");
    expect(emailTextField.value).toBe("");
    expect(birthDateTextField.value).toBe("");
    expect(cityTextField.value).toBe("");
    expect(zipCodeTextField.value).toBe("");
  });
});

// Vérifiez que le toaster de succès est affiché
test('should display a success toaster', async () => {
  const submitButton = screen.getByTestId('save');
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Form is valid, save in localStorage')).toBeInTheDocument();
  });
});