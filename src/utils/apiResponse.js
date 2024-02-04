const response = (data, statusCode, status, message) => {
  return {
    status: status,
    statusCode: statusCode,
    message: message,
    data: data,
  };
};

module.exports = {
  response
}