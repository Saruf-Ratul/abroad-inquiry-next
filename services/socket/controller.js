/**
 * Socket event controller
 */
class Controller {
  /**
   * 
   * @param {*} socket 
   * @param {String} eventName 
   * @param {Object} message 
   * @returns {Object}
   */
  emit(socket, eventName, message){
    return socket?.emit(eventName, message)
  }
}
export default new Controller();