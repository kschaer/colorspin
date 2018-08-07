export default (randomHex = () => {
  return (
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase()
  );
});
