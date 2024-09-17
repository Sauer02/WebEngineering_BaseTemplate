const SHOW_COMMENTS = 'Show comments';
const HIDE_COMMENTS = 'Hide comments';

const initCommentSection = () => {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');
    
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
    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');
  
    form.onsubmit = (e) => {
      e.preventDefault();
  
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      const nameValue = nameField.value;
      const commentValue = commentField.value;
  
      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;
  
      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);
  
      nameField.value = '';
      commentField.value = '';
    };
  };
  