// W3.CSS Modal

export const MODAL_TYPE_INFO = 'Info';
export const MODAL_TYPE_SUCCESS = 'Success';
export const MODAL_TYPE_ERROR = 'Error';
export const MODAL_TYPE_WARNING = 'Warning';
type ModalType = typeof MODAL_TYPE_INFO | typeof MODAL_TYPE_ERROR | typeof MODAL_TYPE_WARNING | typeof MODAL_TYPE_SUCCESS;

// add success?
const modalColors = {
  [MODAL_TYPE_INFO]: 'w3-info',
  [MODAL_TYPE_ERROR]: 'w3-danger',
  [MODAL_TYPE_WARNING]: 'w3-warning',
  [MODAL_TYPE_SUCCESS]: 'w3-success',
};

export const showModal = (type: ModalType, msg: string) => {
  document.getElementById('modal')!.style.display = 'block';

  const msgElm = document.getElementById('modalMessage');
  if (msgElm instanceof HTMLElement) {
    msgElm.innerText = msg;
  }

  const titleElm = document.getElementById('modalTitle');
  if (titleElm instanceof HTMLElement) {
    titleElm.innerText = type;
  }

  const headerElm = document.getElementById('modalHeader');
  if (headerElm instanceof HTMLElement) {
    headerElm.classList.remove('w3-info', 'w3-danger', 'w3-warning', 'w3-success');
    headerElm.classList.add(modalColors[type]);
  }

  const buttonElm = document.getElementById('modalOkButton');
  if (buttonElm instanceof HTMLElement) {
    buttonElm.classList.remove('w3-info', 'w3-danger', 'w3-warning', 'w3-success');
    buttonElm.classList.add(modalColors[type]);
  }
};