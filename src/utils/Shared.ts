export function getTimeSince(eventDate: Date): string {
    const currentDate = new Date();
  
    // Calculate the difference between the current date and time and the event date and time
    const differenceInMilliseconds = currentDate.getTime() - new Date(eventDate).getTime();
  
    // Calculate the difference in seconds, minutes, hours, days, months, and years
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInMonths = Math.floor(differenceInDays / 30);
    const differenceInYears = Math.floor(differenceInDays / 365);
  
    // Choose the most appropriate time unit to display the timesince value
    let timesince = '';
    if (differenceInMilliseconds < 1000) {
      timesince = 'just now';
    } else if (differenceInSeconds < 60) {
      timesince = `${differenceInSeconds} second${differenceInSeconds === 1 ? '' : 's'} ago`;
    } else if (differenceInMinutes < 60) {
      timesince = `${differenceInMinutes} minute${differenceInMinutes === 1 ? '' : 's'} ago`;
    } else if (differenceInHours < 24) {
      timesince = `${differenceInHours} hour${differenceInHours === 1 ? '' : 's'} ago`;
    } else if (differenceInDays < 30) {
      timesince = `${differenceInDays} day${differenceInDays === 1 ? '' : 's'} ago`;
    } else if (differenceInMonths < 12) {
      timesince = `${differenceInMonths} month${differenceInMonths === 1 ? '' : 's'} ago`;
    } else {
      timesince = `${differenceInYears} year${differenceInYears === 1 ? '' : 's'} ago`;
    }
  
    return timesince;
  }
  
  