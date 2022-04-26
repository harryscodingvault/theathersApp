const hasProperties = (...properties) => {
  return (res, req, next) => {
    const { data = {} } = res.body;

    try {
      properties.forEach((property) => {
        const value = data[property];
        if (!value) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 404;
          throw error;
        }
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = hasProperties;
