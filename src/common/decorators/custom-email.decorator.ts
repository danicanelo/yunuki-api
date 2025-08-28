/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class CustomEmailValidator implements ValidatorConstraintInterface {
    validate(email: string) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    defaultMessage(args: ValidationArguments) {
        const email = args.value;
        if (!email) return 'El correo electrónico es obligatorio.';
        if (!email.includes('@')) return 'El correo electrónico debe contener un símbolo @.';
        if (!email.includes('.')) return 'El correo electrónico debe contener un dominio válido.';
        if (email.startsWith('@') || email.endsWith('@')) return 'El correo electrónico no puede comenzar o terminar con un símbolo @.';
        return 'El correo electrónico debe ser válido.';
    }
}

export function isCustomEmail(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isCustomEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CustomEmailValidator
        });
    }
}