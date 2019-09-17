export const func = () => {};

export const getIconUrl = (iconName: string, hexColor: string) => {
  return `https://icon.now.sh/${iconName}/${hexColor}`;
};

export const convertDollarsToCents = (price: number) => {
  return (price * 100).toFixed(0);
};
