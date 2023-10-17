import Alert from 'react-bootstrap/Alert'

const errorMessage = ({ alertType, message }) => {
  return <Alert variant={alertType}>{message}</Alert>
}
export default errorMessage
