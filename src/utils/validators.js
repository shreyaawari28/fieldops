export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateRequired(value) {
  return String(value || '').trim().length > 0
}

export function validatePassword(value) {
  return String(value || '').trim().length >= 6
}
