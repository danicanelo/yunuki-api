/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function isStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isStrongPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    if (value.length < 8) {
                        (args as any).constraints.push('La contraseña debe tener al menos 8 caracteres.');
                        return false;
                    }
                    const hasNumber = /[0-9]/.test(value);
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                    return hasNumber && hasUpperCase && hasLowerCase;
                },
                defaultMessage(args: ValidationArguments) {
                    return 'La contraseña debe ser igual o mayor a 8 caracteres e incluir mayúsculas, minúsculas y números.';
                }
            }
        });
    };
}