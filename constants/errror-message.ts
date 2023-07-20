export const ERROR_MESSAGE = {
	REQUIRED: 'This is a required field.',
	INVALID_EMAIL: 'Email address is not in the correct format.',
	INVALID_FILE_TYPE: 'Your file is not in the correct format.',
	UPLOAD_FAILDED: 'Upload failed.',
	WRONG_CREDENTIALS: 'The Email or Password is Incorrect.',
	WRONG_CURRENT_PASSWORD: 'The current password is incorrect.',
	OUT_OF_RANGE_CONFIRM_PASSWORD: 'The new password must be between 8 and 64 characters.',
	INVALID_PASSWORD: 'You need at least a capital letter, a number and a special character.',
	NOT_MATCH_CONFIRM_PASSWORD: 'The password confirmation does not match.',
	TOO_SMALL_STRING: (value: number) => `You need at least ${value} characters.`,
	TOO_BIG_STRING: (value: number) => `You have exceeded ${value} characters.`,
	TOO_BIG_DIGIT: (value: number) => `You have exceeded ${value} digits.`,
	TOO_BIG_FILE_SIZE: (value: number) => `Maximum size for upload is ${value / 1024 / 1024} MB.`,
	ONLY_TEXT: 'Only text is allowed.',
	ONLY_TEXT_NUMBER: 'Only text and number allowed.',
	NOT_ALLOW_2_CONSECUTIVE_CAPPITAL: (field?: string) =>
		field
			? `${field} should not include more than 2 consecutive capital letter.`
			: 'It is not allowed to enter 2 adjacent space characters.',
	ONLY_NUMBER: 'Only number is allowed.',
	AT_LEAST_ONE_TYPE: (type: string) => `You need at least 1 ${type}.`,
	UNIQUE_FIELD: (field: string) => `${field} must be unique.`,
	EMAIL_ALREADY_TAKEN: 'This Email address is taken. Please try another.',
	GREATER_OR_EQUAL_CURRENT_DATE: 'Please enter a value equal to or greater than the current date.',
	END_DATE: 'The End date cannot be before the Start date, please check again ',
}
