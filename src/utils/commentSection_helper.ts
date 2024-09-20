const SHOW_COMMENTS = 'Show comments';
const HIDE_COMMENTS = 'Hide comments';

const initCommentSection = (): void => {
  const showHideBtn = document.querySelector<HTMLButtonElement>('.show-hide');
  const commentWrapper =
    document.querySelector<HTMLDivElement>('.comment-wrapper');

  if (!showHideBtn || !commentWrapper) {
    console.error('Required elements not found in the DOM');
    return;
  }

  commentWrapper.style.display = 'none';

  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;
    if (showHideText === SHOW_COMMENTS) {
      showHideBtn.textContent = HIDE_COMMENTS;
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = SHOW_COMMENTS;
      commentWrapper.style.display = 'none';
    }
  };

  // Functionality for adding a new comment
  const form = document.querySelector<HTMLFormElement>('.comment-form');
  const nameField = document.querySelector<HTMLInputElement>('#name');
  const commentField = document.querySelector<HTMLTextAreaElement>('#comment');
  const list = document.querySelector<HTMLUListElement>('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Required form elements not found in the DOM');
    return;
  }

  form.onsubmit = (e: Event) => {
    e.preventDefault();

    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');
    const nameValue = nameField.value;
    const commentValue = commentField.value;

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);
    list.appendChild(listItem);

    nameField.value = '';
    commentField.value = '';
  };
};

export default initCommentSection;
