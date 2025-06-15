export const validationRegxSpecific = {
  telegram: /^[a-zA-Z0-9_\s"-]{2,32}$/,
  phone: /^\+?7\d{10}/,
};

const phoneFormat = (phone: string) => {
  if (validationRegxSpecific.phone.test(phone)) {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, `$1 ($2) $3-$4-$5`);
  }

  return '';
};

export default phoneFormat;
