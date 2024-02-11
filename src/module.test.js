import { calculateAge } from './module';
import { isErrorsValid, isDisabled, emailRegex, postalCodeRegex, nameRegex } from './App';


/**
 * @function calculateAge
 */
describe('calculateAge Unit test Suites', () => {
    it('should return a correct age', () => {
        const loise = {
            birth: new Date("11/07/1991")
        };
        expect(calculateAge(loise)).toEqual(32);
    })
    //le format envoyé n'est pas un objet
    it('should throw a "missing param" error', () => {
        expect(() => calculateAge()).toThrow("missing param")
    })

    //l'objet ne contient pas un champs birth
    it('should throw a "missing param birth" error', () => {
        expect(() => calculateAge({})).toThrow("missing param birth")
    })

    //le champs birth n'est pas une date
    it('should throw a "missing param birth date" error', () => {
        expect(() => calculateAge({birth: "test"})).toThrow("missing param birth date")
    })
    //la date envoyée est fausse
    it('should throw a "missing param birth date false" error', () => {
        expect(() => calculateAge({birth: new Date("21/07/1991")})).toThrow("missing param birth date false")
    })
    //lancé le test l'année prochaine de façon dynamique 
    it('should return a correct age', () => {
        const currentDate = new Date();
        const newDate = currentDate.setFullYear(currentDate.getFullYear() - 20);
        expect(calculateAge({birth:new Date(newDate)})).toBe(20);
    })
    // l'age doit être supérieur à 18
    it('should return error age -18 ', () => {
        const currentDate = new Date();
        const newDate = currentDate.setFullYear(currentDate.getFullYear() - 17);
        expect(calculateAge({birth:new Date(newDate)})).toBe(17);
    })
});

/**
 * @function isErrorsValid
 */
describe('isErrorsValid unit test Suites', () => {
    //retourne true quand tous les champs sont vides
    it('should return true', () => {
        const errors = {
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            postalCode: '',
        };
        expect(isErrorsValid(errors)).toBe(true);
    })
    //retourne true quand au moins un champ vide
    it('should return false', () => {
        const errors = {
            firstName: 'test',
            lastName: '',
            email: '',
            birthDate: '',
            postalCode: '',
        };
        expect(isErrorsValid(errors)).toBe(false);
    })
});

/**
 * @function isDisable
 */
describe('isDisable unit test Suites', () => {
    //retourne true quand tous les champs sont vides
    it('should return true when field empty', () => {
        const formData = {
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            postalCode: '',
        };
        expect(isDisabled(formData)).toBe(true);
    })
    //retourne true quand au moins un champ vide
    it('should return true when at least one empty field', () => {
        const formData = {
            firstName: 'test',
            lastName: 'test',
            email: '',
            birthDate: '',
            postalCode: '',
        };
        expect(isDisabled(formData)).toBe(true);
    })
    //retourne false si tous les champs sont remplis
    it('should return false when all fields are filled', () => {
        const formData = {
            firstName: 'test',
            lastName: 'test',
            email: 'test',
            birthDate: 'test',
            postalCode: 'test',
        };
        expect(isDisabled(formData)).toBe(false);
    })
});

/**
 * @function emailRegex
 */
describe('Regex email unit test Suites', () => {
    //retourne true quand l'email est valide
    it('should return true when the email is valid', () => {
        expect(emailRegex.test('test@test.fr')).toBeTruthy;
    });
    //retourne true quand l'email contient un chiffre
    it('should return true when the email with number', () => {
        expect(emailRegex.test('test1@test.fr')).toBeTruthy;
    });
    //retourne false quand l'email n'est pas en entier
    it('should return false when the email is not complete', () => {
        expect(emailRegex.test('test')).toBeFalsy;
    });
    //retourne false quand l'email ne contient pas un caractere spéciale
    it('should return false when the email with special caractere', () => {
        expect(emailRegex.test('t!est@test.fr')).toBeFalsy;
    });
});

/**
 * @function postalCodeRegex
 */
describe('Regex postalCode unit test Suites', () => {
    //retourne true quand le code postal est valide
    it('should return true when the postalCode is valid', () => {
        expect(postalCodeRegex.test('06700')).toBeTruthy;
    });
    //retourne false quand le code postal n'est pas un nombre
    it('should return false when the postalCode is invalid', () => {
        expect(postalCodeRegex.test('test')).toBeFalsy;
    });
    //retourne false quand le code postal contient un caractere spéciale
    it('should return false when the postalCode with special caractere', () => {
        expect(postalCodeRegex.test('0670!')).toBeFalsy;
    });
    //retourne false quand le code postal contient une lettre
    it('should return false when the postalCode with letter', () => {
        expect(postalCodeRegex.test('0670a')).toBeFalsy;
    });
    //retourne false quand le code postal manque de chiffre
    it('should return false when the postalCode with missing number', () => {
        expect(postalCodeRegex.test('0670')).toBeFalsy;
    });
    //retourne false quand le code postal contient un chiffre de plus
    it('should return false when the postalCode with more number', () => {
        expect(postalCodeRegex.test('067000')).toBeFalsy;
    });
});

/**
 * @function nameRegex
 */
describe('Regex name unit test Suites', () => {
    //retourne true quand le nom est valide
    it('should return true when the name', () => {
        expect(nameRegex.test('Cecile')).toBeTruthy;
    });
    //retourne true quand le nom contient un accent
    it('should return true when the name with accent', () => {
        expect(nameRegex.test('Cécile')).toBeTruthy;
    });
    //retourne true quand le nom contient un tiret
    it('should return true when the name with dash', () => {
        expect(nameRegex.test('Cécile-cecile')).toBeTruthy;
    });
    //retourne true quand le nom contient un espace
    it('should return true when the name with space', () => {
        expect(nameRegex.test('Cécile cecile')).toBeTruthy;
    });
    //retourne false quand le nom contient un chiffre
    it('should return false when the name with number', () => {
        expect(nameRegex.test('Cécile1')).toBeFalsy;
    });
    //retourne false quand le nom contient un caractere spéciale
    it('should return false when the name with special caractere', () => {
        expect(nameRegex.test('Cécile!')).toBeFalsy;
    });
});