import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Dispatch } from 'redux';
import { withSnackbar, WithSnackbarProps, SnackbarKey, SharedProps } from 'notistack';
import { removeSnackbar } from 'src/actions/notification';
import { compose } from 'recompose';
import { SnackbarNotification } from 'src/types/global';

interface IProps {
    removeSnackbarAction: (id: any) => void;

    notifications: SnackbarNotification[];
}

type TProps = IProps & WithSnackbarProps;

class Notifier extends Component<TProps> {
    displayed: SnackbarKey[] = [];

    storeDisplayed = (id?: SnackbarKey) => {
        if (id) {
            this.displayed = [...this.displayed, id];
        }
    };

    shouldComponentUpdate({ notifications: newSnacks = [] }: TProps) {
        if (!newSnacks.length) {
            this.displayed = [];
            return false;
        }

        const { notifications: currentSnacks, removeSnackbarAction } = this.props;

        let notExists = false;
        for (let i = 0; i < newSnacks.length; i += 1) {
            const newSnack: SnackbarNotification = newSnacks[i];

            if (newSnack.dissmissed) {
                removeSnackbarAction(newSnack.key);
            }

            if (notExists) continue;

            notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length;
        }

        return notExists;
    }

    componentDidUpdate() {
        const { notifications = [], enqueueSnackbar, removeSnackbarAction } = this.props;

        notifications.forEach(({ key, message, options = {} }) => {
            if (key && this.displayed.includes(key)) return;

            const snackProps: SharedProps = {
                ...options,
                onClose: (event, reason) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }

                    removeSnackbarAction(key);
                },
            };

            enqueueSnackbar(message, snackProps);

            this.storeDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state: RootState) => ({
    notifications: state.notify.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        removeSnackbarAction: (key: SnackbarKey) => dispatch(removeSnackbar(key)),
    };
};

export default compose<TProps, any>(withSnackbar, connect(mapStateToProps, mapDispatchToProps))(Notifier);
