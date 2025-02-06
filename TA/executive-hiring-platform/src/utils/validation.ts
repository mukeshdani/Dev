export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};

export const validateJobTitle = (title: string): boolean => {
    return title.trim().length > 0;
};

export const validateCandidateName = (name: string): boolean => {
    return name.trim().length > 0;
};

export const validateResume = (resume: string): boolean => {
    return resume.trim().length > 0;
};