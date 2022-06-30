declare var $: any;

class Notifications {

    showNotification(type: NotificationType, message: string) {
        $.notify({
            icon: 'pe-7s-gift',
            message: message
        }, {
            type: type,
            timer: 1000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }

    showNotificationError(message: string) {
        this.showNotification(NotificationType.DANGER, message)
    }

    showNotificationSuccess(message: string) {
        this.showNotification(NotificationType.SUCCESS, message)
    }

    showNotificationInfo(message: string) {
        this.showNotification(NotificationType.INFO, message)
    }

    showNotificationWarn(message: string) {
        this.showNotification(NotificationType.WARNING, message)
    }
}

export default new Notifications()

export enum NotificationType {
    NONE = '',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger'
}
