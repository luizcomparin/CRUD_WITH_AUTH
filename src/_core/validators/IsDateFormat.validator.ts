import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
class IsDateFormatConstraint implements ValidatorConstraintInterface {
	validate(value: string, args: ValidationArguments): boolean {
		return new Date(value).toString() !== 'Invalid Date';
	}
}

export function IsDateFormat(validationOptions: ValidationOptions = {}) {
	if (!validationOptions.message) {
		validationOptions.message = (args) => `'${args.property}' must be of type convertible to Date. Received value is '${args.value}' of type '${typeof args.value}'`
	}
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'IsDateFormat',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsDateFormatConstraint
		});
	}
};
