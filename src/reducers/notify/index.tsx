import { AnyAction } from 'redux';
import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from 'src/actions';
import { SnackbarNotification } from 'src/types/global';

interface IProps {
    notifications: SnackbarNotification[];
}

const defaultState: IProps = {
    notifications: [],
};


export default function (
    state = defaultState,
    action: AnyAction
): IProps {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification
                    }
                ]
            };
        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map((notification: SnackbarNotification) =>
                    action.dismissAll || notification.key === action.key
                        ? { ...notification, dissmissed: true }
                        : { ...notification }
                ),
            };


        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification: SnackbarNotification) => notification.key !== action.key
                ),
            };

        default:
            return state;
    }
}
