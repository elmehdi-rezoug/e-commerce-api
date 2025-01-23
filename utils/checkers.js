import validator from "validator";

export const passwordChecker = (password) => {
    const isStrongPass = validator.isStrongPassword(password, {
        minLength: 8, // Minimum password length
        minUppercase: 1, // Require at least one uppercase letter
        minSymbols: 1,// Require at least one symbol
        minNumbers: 0,
        minLowercase: 0
    });
    return isStrongPass;
};