const styles = {
  imageFile: {
    display: 'block',
    width: 200,
    border: '1px solid $highlight',
    padding: 5,
    border: (theme) => `1px solid ${theme.highlightColor}`,
  },

  image: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    border: 2,
    marginRight: 5,

    backgroundImage:
      'linear-gradient(45deg, #f1f1f1 25%, transparent 25%), linear-gradient(-45deg, #f1f1f1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f1f1 75%), linear-gradient(-45deg, transparent 75%, #f1f1f1 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    border: (theme) => `1px solid #c4c4c4`,
  },
};

export default styles;
