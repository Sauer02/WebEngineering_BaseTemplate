const SHOW_COMMENTS = 'Show comments';
const HIDE_COMMENTS = 'Hide comments';

const initCommentSection = (): void => {
  const showHideBtn = getElement<HTMLButtonElement>('.show-hide');
  const commentWrapper = getElement<HTMLDivElement>('.comment-wrapper');

  if (showHideBtn === null || commentWrapper === null) return;

  initializeShowHideComments(showHideBtn, commentWrapper);
  initializeCommentForm();
};

const getElement = <T extends HTMLElement>(selector: string): T | null => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    console.error(`Element with selector "${selector}" not found.`);
  }
  return element;
};

const initializeShowHideComments = (
  showHideBtn: HTMLButtonElement,
  commentWrapper: HTMLDivElement
): void => {
  commentWrapper.style.display = 'none';

  showHideBtn.onclick = () => {
    toggleCommentVisibility(showHideBtn, commentWrapper);
  };
};

const toggleCommentVisibility = (
  showHideBtn: HTMLButtonElement,
  commentWrapper: HTMLDivElement
): void => {
  if (showHideBtn.textContent === SHOW_COMMENTS) {
    showHideBtn.textContent = HIDE_COMMENTS;
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = SHOW_COMMENTS;
    commentWrapper.style.display = 'none';
  }
};

const initializeCommentForm = (): void => {
  const form = getElement<HTMLFormElement>('.comment-form');
  const nameField = getElement<HTMLInputElement>('#name');
  const commentField = getElement<HTMLTextAreaElement>('#comment');
  const list = getElement<HTMLUListElement>('.comment-container');

  if (
    form === null ||
    nameField === null ||
    commentField === null ||
    list === null
  )
    return;

  form.onsubmit = (e: Event) => {
    e.preventDefault();
    addCommentToList(nameField, commentField, list);
    resetFormFields(nameField, commentField);
  };
};

const addCommentToList = (
  nameField: HTMLInputElement,
  commentField: HTMLTextAreaElement,
  list: HTMLUListElement
): void => {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');

  namePara.textContent = nameField.value;
  commentPara.textContent = commentField.value;

  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);
  list.appendChild(listItem);
};

export const resetFormFields = (
  nameField: HTMLInputElement,
  commentField: HTMLTextAreaElement
): void => {
  nameField.value = '';
  commentField.value = '';
};

export default initCommentSection;
