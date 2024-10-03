import {
  CHECKING_EMAIL_EXISTENCE_CALL,
  CHECKING_OTP_CALL,
  RESET_PASSWORD_CALL,
} from "../AuthRequests";

/**
 * Authentication controller
 */
class authController {
  /**
   * Check if an email is exist in our system.
   * @param {Object} data 
   * @param {Function} setLoading 
   * @param {Function} setOutput 
   * @param {Function} setError 
   */
  checkingEmailExistence(data, setLoading, setOutput, setError) {
    setLoading(true);
    setError(false);
    CHECKING_EMAIL_EXISTENCE_CALL(data)
      .then((res) => {
        setOutput(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError({ message: "Email no found!" });
        setOutput();
        setLoading(false);
      });
  }

  /**
   * Password reset
   * @param {Function} setLoading 
   * @param {Object} data 
   * @param {Function} setOutput 
   */
  resetPassword(setLoading, data, setOutput) {
    setLoading(true);
    RESET_PASSWORD_CALL(data)
      .then((res) => {
        res.data.message ? setOutput(true) : setOutput(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }
}
export default new authController();
