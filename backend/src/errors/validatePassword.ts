export default function validatePassword(password: string): { valid: boolean; message: string } {
  // Verifica tamanho mínimo
  if (password.length < 8) {
    return {
      valid: false,
      message: 'A senha deve ter no mínimo 8 caracteres',
    };
  }

  // Verifica se tem letra maiúscula
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    };
  }

  // Verifica se tem letra minúscula
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: 'A senha deve conter pelo menos uma letra minúscula',
    };
  }

  // Verifica se tem número
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: 'A senha deve conter pelo menos um número',
    };
  }

  // Verifica se tem caractere especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      valid: false,
      message: 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)',
    };
  }

  return {
    valid: true,
    message: 'Senha válida',
  };
}