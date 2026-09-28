export interface PopupData {

    type:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'confirm';

    title: string;

    message: string;

    okText?: string;

    cancelText?: string;

}