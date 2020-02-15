import { IUser } from "../../models/interfaces/IUser";
import { IActivity } from "../../models/activity";

export const combineDateAndTime = (date: Date, time: Date ) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);

}

export const setActivityProps = (activity: IActivity, user: IUser) =>
{
    activity.date = new Date(activity.date!);

    //these props below are for currently signed in user

    //check for all attendees, if the user is going to this
    activity.isGoing = activity.attendees.some(
        activ => activ.username === user.username
    );

    //check the attendees if it has the username and if that entry is host 
    activity.isHost = activity.attendees.some(
        att => att.username === user.username && att.isHost
    );

    // return activity;
}