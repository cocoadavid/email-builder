const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const cleanProjectName = (input: string) => {
  return removeAccents(input).replace(/\s+/g, '_').replace(/[^A-Za-z0-9_]/g, ''); ;
};