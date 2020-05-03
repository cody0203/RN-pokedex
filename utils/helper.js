export const zeroPad = (num, places) => String(num).padStart(places, '0');

export const transformedColor = (color) => {
  const splitedLgColor = color.split(/[ ,]+/);

  const colors = [];
  const locations = [];
  let angle = '';

  splitedLgColor.filter((value) => {
    if (value.includes('#')) {
      colors.push(value);
    }
    if (value.includes('%')) {
      locations.push(value.replace('%', '') / 100);
    }

    if (value.includes('deg')) {
      angle = value.replace('deg', '');
    }
  });

  return {
    colors,
    locations,
    angle,
  };
};
