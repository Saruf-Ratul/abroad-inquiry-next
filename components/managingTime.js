/**
 * Time management
 * @returns {Class}
 */
class ManagingTime {
    /**
     * Array of month names.
     * @type {string[]}
     */
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    /**
     * Get the current time in the format HH:mm.
     * @returns {string} The current time.
     */
    getCurrentTime() {
      return new Date().toString().slice(16, 21);
    }
  
    /**
     * Add two time values in the format HH:mm.
     * @param {string} date1 - The first time value.
     * @param {string} date2 - The second time value.
     * @returns {string} The result of adding the two time values.
     */
    addingDate(date1, date2) {
      let firstDate = date1.split(":");
      let secondDate = date2.split(":");
      const result = [];
      firstDate.reduceRight((carry, num, index) => {
        const max = [24, 60, 60][index];
        const add = +secondDate[index];
        result.unshift((+num + add + carry) % max);
        return Math.floor((+num + add + carry) / max);
      }, 0);
  
      return result.join(":");
    }
  
    /**
     * Compare two time values in the format HH:mm.
     * @param {string} date1 - The first time value.
     * @param {string} date2 - The second time value.
     * @returns {(boolean|string)} True if the first time is greater, false if the second time is greater, or "equal" if they are equal.
     */
    conpareTime(date1, date2) {
      let firstDate = date1.split(":");
      let secondDate = date2.split(":");
      let firstDateDuration =
        parseInt(firstDate[0]) + parseInt(firstDate[1]) / 60;
      let secondDateDuration =
        parseInt(secondDate[0]) + parseInt(secondDate[1]) / 60;
  
      if (firstDateDuration > secondDateDuration) {
        return true;
      } else if (firstDateDuration < secondDateDuration) {
        return false;
      } else {
        return "equal";
      }
    }
  
    /**
     * Convert a date to UTC format.
     * @param {string} data - The date to convert.
     * @returns {string} The UTC formatted date.
     */
    toUTC(data) {
      return new Date(data).toUTCString();
    }
  
    /**
     * Get the local time in the format HH:mm from a given date.
     * @param {string} data - The date to get the local time from.
     * @returns {string} The local time.
     */
    getLocalTime(data) {
      return new Date(data).toString().slice(16, 21);
    }
  
    /**
     * Get the local time in the format HH:mm from a given local timestamp.
     * @param {string} data - The local timestamp.
     * @returns {string} The local time.
     */
    getLocalTimefromLocalTimeStamp(data) {
      return data.toString().slice(16, 21);
    }
  
    /**
     * Get the local date in the format "DD Mon, YYYY" from a given date.
     * @param {string} data - The date to get the local date from.
     * @returns {string} The local date.
     */
    getLocalDate(data) {
      return `${new Date(data).toString().slice(8, 10)} ${new Date(data)
        .toString()
        .slice(4, 7)}, ${new Date(data).toString().slice(11, 15)}`;
    }
  
    /**
     * Get the local date in the format "DD Mon, YYYY" from a given local timestamp.
     * @param {string} data - The local timestamp.
     * @returns {string} The local date.
     */
    getLocalDatefromLocalTimeStamp(data) {
      return `${data.toString().slice(8, 10)} ${data
        .toString()
        .slice(4, 7)}, ${data.toString().slice(11, 15)}`;
    }
  
    /**
     * Get the UTC date in the format "Mon, DD, YYYY,HH:mm" from a given date.
     * @param {string} data - The date to get the UTC date from.
     * @returns {string} The UTC date.
     */
    getUTCDate(data) {
      return `${data.toUTCString().slice(5, 11)},${data
        .toUTCString()
        .slice(11, 16)}`;
    }
  
    /**
     * Make a GMT formatted time string from a given date.
     * @param {object} date - The date object.
     * @param {number} date.month - The month (1-12).
     * @param {number} date.day - The day of the month.
     * @param {number} date.year - The year.
     * @param {string} date.timestamp - The timestamp string.
     * @returns {string} The GMT formatted time string.
     */
    makeGMTFormatTime(date) {
      return `${this.months[date.month - 1]} ${date.day} ${
        date.year
      } ${this.getLocalTime(date.timestamp)}:00 ${this.getGMTInfo(
        date.timestamp
      )}`;
    }
  
    /**
     * Get the month abbreviation for a given date.
     * @param {object} date - The date object.
     * @param {number} date.month - The month (1-12).
     * @returns {string} The month abbreviation.
     */
    mdf(date) {
      return `${date.month}`;
    }
  
    /**
     * Get the GMT information from a given date.
     * @param {string} data - The date to get the GMT information from.
     * @returns {string} The GMT information.
     */
    getGMTInfo(data) {
      return new Date(data).toString().slice(25);
    }
  
    // isTodaysDate(from_front_end){
    //     let inputed_date = this.getLocalDate(from_front_end.timestamp)
    //     let todaysDate = this.getLocalDate(new Date());
    //     return todaysDate == inputed_date;
    // }
  
    /**
     * Check if a given date is today's date.
     * @param {string} date - The date to check.
     * @returns {boolean} True if the date is today's date, false otherwise.
     */
    isTodaysDate(date) {
      return this.getLocalDate(date) == this.getLocalDate(new Date());
    }
  
    /**
     * Get the timestamp of a schedule given the date and time.
     * @param {string} date - The date string.
     * @param {string} time - The time string.
     * @returns {object} The timestamp of the schedule.
     */
    getScheduleTimeStamp(date, time) {
      let timeStamp = new Date(date);
      return new Date(
        `${timeStamp.toString().slice(0, 15)} ${time.toString().slice(16)}`
      );
    }
  
    /**
     * Get the timestamp from a given date.
     * @param {string} data - The date string.
     * @returns {number} The timestamp.
     */
    getTimeStamp(data) {
      return new Date(data).getTime();
    }
  
    /**
     * Get the selected date in string format from a given date.
     * @param {string} date - The date to convert.
     * @returns {string} The selected date in string format.
     */
    getSelectedDate(date) {
      return new Date(date).toString();
    }
  
    /**
     * Remove the seconds from a given date.
     * @param {string} date - The date to remove seconds from.
     * @returns {string} The date without seconds.
     */
    removingSecond(date) {
      let timeStamp = new Date(date);
      return `${timeStamp.toString().slice(0, 21)}:00 ${timeStamp
        .toString()
        .slice(25)}`;
    }
  }
  const managingTime = new ManagingTime();
  export default managingTime;