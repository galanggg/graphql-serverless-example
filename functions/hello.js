exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Hello'
    })
  }
  callback(undefined, response)
}