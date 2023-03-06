export const formatDate = (val: string) => {
  const date = new Date(val);

  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}