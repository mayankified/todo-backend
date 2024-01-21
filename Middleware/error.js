export const handleError = (res, status, message) => {
    res.json({
      success: false,
      message: message,
    });
  };