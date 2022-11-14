import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from "../global";
import { SnackbarKey } from "notistack";
import { SnackbarNotification } from "src/types/global";

export const snackbarSuccess = (msg: string) => {
    return enqueueSnackbar({
        message: msg || "error",
        options: {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            autoHideDuration: 1000,
        },
    });
};

export const snackbarWarning = (msg: string) => {
    return enqueueSnackbar({
        message: msg || "error",
        options: {
            variant: "warning",
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
        },
    });
};

export const snackbarFailure = (msg: string) => {
    return enqueueSnackbar({
        message: msg || "error",
        options: {
            variant: "error",
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
        },
    });
};

export const enqueueSnackbar = (notification: SnackbarNotification) => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
            autoHideDuration: 1000,
        },
    };
};

export const closeSnackbar = (key: any) => {
    return {
        type: CLOSE_SNACKBAR,
        dismissAll: !key,
        key,
    };
};

export const removeSnackbar = (key: SnackbarKey) => {
    return {
        type: REMOVE_SNACKBAR,
        key,
    };
};