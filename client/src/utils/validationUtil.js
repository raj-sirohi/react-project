
export const required = (value = '', errorMessage = 'Field') => {
  if (!value.trim()) {
    return `${errorMessage} is Required !`;
  }
}
