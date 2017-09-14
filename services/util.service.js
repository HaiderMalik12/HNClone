const moment = require('moment');


export function convertToUserFriendly(date, includeTime) {
    if (date == null || (typeof date == 'undefined') || date == '0000-00-00 00:00:00') { // Date was null or undefined
        return 'Never';
    }

    if (includeTime == null || (typeof includeTime == 'undefined')) { // Time was null or undefined
        includeTime = false;
    }

    let today = new Date(),
        yesterday = new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()),
        dateToCompare = new Date(date),
        dateAsDate = new Date(dateToCompare.getFullYear() + '/' + (dateToCompare.getMonth() + 1) + '/' + dateToCompare.getDate()),
        returnText = '';

    yesterday.setDate(yesterday.getDate() - 1);

    if (dateAsDate.getTime() == yesterday.getTime()) { // If the date was during yesterday
        returnText = 'Yesterday';
    } else if (dateAsDate > yesterday && dateToCompare < today) { // If the date was today but in the past
        returnText = convertSecToFriendly(dateToCompare, today);
    } else if (dateToCompare > today) { // If the date was in the future
        returnText = dateToCompare.getDate() + ' ' + convertMonthToText(dateToCompare.getMonth()) + ' ' + dateToCompare.getFullYear();
    } else { // Otherwise in the past
        returnText = dateToCompare.getDate() + ' ' + convertMonthToText(dateToCompare.getMonth());
    }

    return returnText + (includeTime ? ' ' + (dateToCompare.getHours().toString().length === 1 ? "0" + dateToCompare.getHours() : dateToCompare.getHours()) + ':' + (dateToCompare.getMinutes().toString().length === 1 ? "0" + dateToCompare.getMinutes() : dateToCompare.getMinutes()) : '');
}

export function convertMonthToText(i) {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[i];
}

export function convertSecToFriendly(from, since) {
    let secs = Math.floor(Math.abs((from - since) / 1000)), // Difference in seconds
        mins = Math.floor(secs / 60),
        hours = Math.floor(mins / 60);

    if (secs < 60) {
        return secs + ' second' + (secs > 1 ? 's' : '') + ' ago';
    } else if (mins < 60) {
        return mins + ' minute' + (mins > 1 ? 's' : '') + ' ago';
    } else {
        return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    }
}

export function addHours(date, hours) {
    const expDate = moment(date).add(hours, 'h');
    return new Date(expDate);
}
