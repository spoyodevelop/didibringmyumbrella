const filterAndMapItems = (data, category) => {
  return data.item
    .filter((item) => item.category === category)
    .reduce((acc, item) => {
      acc[item.category] = { ...item };
      return acc;
    }, {});
};
module.exports = filterAndMapItems;
