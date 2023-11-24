export const formatYYMMDD = (date: Date) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${year}-${month}-${day}`;
};

export const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export function formatDateReq(dateString: any) {
  const parts = dateString.toString().split('/');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const formattedDay = String(formattedDate.getDate()).padStart(2, '0');
    const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const formattedYear = formattedDate.getFullYear();

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }
  return dateString;
}

export function formatDateString(dateString: any) {
  const [year, month, day] = dateString.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
