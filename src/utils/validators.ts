import { PaymentData, PaymentValidation } from '../components/types/payment';

export const validatePaymentData = (payment: PaymentData): PaymentValidation => {
    const errors: string[] = [];

    // Check if card details are provided for card payments
    if (payment.paymentMethod === 'card') {
        if (!payment.cardHolderName?.trim()) {
            errors.push('Card holder name is required');
        }

        const cleanCardNumber = payment.cardNumber?.replace(/\s/g, '') || '';
        if (!cleanCardNumber) {
            errors.push('Card number is required');
        } else if (!/^\d{13,19}$/.test(cleanCardNumber)) {
            errors.push('Card number must be between 13 and 19 digits');
        } else if (!validateCardNumber(cleanCardNumber)) {
            errors.push('Invalid card number');
        }

        // Bank validation
        if (!payment.bank) {
            errors.push('Please select your bank');
        }

        if (!payment.expiry) {
            errors.push('Expiry date is required');
        } else {
            let month, year;

            if (payment.expiry.includes('-')) {
                // YYYY-MM format
                [year, month] = payment.expiry.split('-');
            } else if (payment.expiry.includes('/')) {
                // MM/YY format
                [month, year] = payment.expiry.split('/');
                // Convert YY to YYYY
                year = `20${year}`;
            } else {
                errors.push('Expiry date must be in MM/YY or YYYY-MM format');
            }

            if (month && year) {
                const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
                const currentDate = new Date();

                // Set to last day of the month
                expiryDate.setMonth(expiryDate.getMonth() + 1);
                expiryDate.setDate(0);

                if (expiryDate < currentDate) {
                    errors.push('Card has expired');
                }
            }
        }

        // CVV validation
        if (!payment.cvv) {
            errors.push('CVV is required');
        } else if (!/^\d{3,4}$/.test(payment.cvv)) {
            errors.push('CVV must be 3 or 4 digits');
        }
    }

    // General payment validation
    if (!payment.amount || payment.amount <= 0) {
        errors.push('Amount must be greater than 0');
    }

    if (!payment.currency) {
        errors.push('Currency is required');
    }

    if (!payment.paymentMethod) {
        errors.push('Payment method is required');
    }

    if (!payment.bookingId) {
        errors.push('Booking ID is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateCardNumber = (cardNumber: string): boolean => {
    const clean = cardNumber.replace(/\s/g, '');

    if (clean.length < 13 || clean.length > 19) {
        return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = clean.length - 1; i >= 0; i--) {
        let digit = parseInt(clean.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

export const validateExpiryDate = (expiry: string): boolean => {
    if (!expiry) return false;

    let month, year;

    if (expiry.includes('-')) {
        [year, month] = expiry.split('-');
    } else if (expiry.includes('/')) {
        [month, year] = expiry.split('/');
        year = `20${year}`;
    } else {
        return false;
    }

    if (!month || !year) return false;

    const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();

    expiryDate.setMonth(expiryDate.getMonth() + 1);
    expiryDate.setDate(0);

    return expiryDate >= currentDate;
};

export const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
};