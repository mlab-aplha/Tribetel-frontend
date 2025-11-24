import { PaymentData } from '../components/types/common';

export const validatePaymentData = (payment: PaymentData): PaymentValidation => {
    const errors: string[] = [];

    // Card Holder Name validation
    if (!payment.cardHolderName?.trim()) {
        errors.push('Card holder name is required');
    }

    // Card Number validation
    const cleanCardNumber = payment.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
        errors.push('Card number is required');
    } else if (!/^\d{16}$/.test(cleanCardNumber)) {
        errors.push('Card number must be 16 digits');
    }

    // Bank validation
    if (!payment.bank) {
        errors.push('Please select your bank');
    }

    // Expiry date validation
    if (!payment.expiry) {
        errors.push('Expiry date is required');
    } else {
        const [year, month] = payment.expiry.split('-');
        const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();

        if (expiryDate < currentDate) {
            errors.push('Card has expired');
        }
    }

    // CVV validation
    if (!payment.cvv) {
        errors.push('CVV is required');
    } else if (!/^\d{3,4}$/.test(payment.cvv)) {
        errors.push('CVV must be 3 or 4 digits');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
export const validateCardNumber = (cardNumber: string): boolean => {
    const clean = cardNumber.replace(/\s/g, '');
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


