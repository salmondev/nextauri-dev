export const generatePassword = (
  length: number,
  useNumbers: boolean,
  useSymbols: boolean,
  useUppercase: boolean
): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let chars = lowercase;
  if (useNumbers) chars += numbers;
  if (useSymbols) chars += symbols;
  if (useUppercase) chars += uppercase;

  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  // Ensure at least one character from each selected type
  let finalPassword = password;
  if (useNumbers && !/\d/.test(password)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = password.substring(0, pos) + 
      numbers[Math.floor(Math.random() * numbers.length)] + 
      password.substring(pos + 1);
  }
  if (useSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = password.substring(0, pos) + 
      symbols[Math.floor(Math.random() * symbols.length)] + 
      password.substring(pos + 1);
  }
  if (useUppercase && !/[A-Z]/.test(password)) {
    const pos = Math.floor(Math.random() * length);
    finalPassword = password.substring(0, pos) + 
      uppercase[Math.floor(Math.random() * uppercase.length)] + 
      password.substring(pos + 1);
  }

  return finalPassword;
};
