import MySwal from 'sweetalert2'

export const alertService = {
    success,
    error,
    info,
    warn
};

export const alertType = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning'
}

// // enable subscribing to alerts observable
// function onAlert(id = defaultId) {
//     return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
// }

// convenience methods
function success(message, options) {   
    MySwal.fire({icon: alertType.success, title: message, ...options});
}

function error(message, options) {
    MySwal.fire({icon: alertType.error, title: message, ...options});
}

function info(message, options) {
    MySwal.fire({icon: alertType.info, title: message, ...options});
}

function warn(message, options) {
    MySwal.fire({icon: alertType.warning, title: message, ...options});
}
