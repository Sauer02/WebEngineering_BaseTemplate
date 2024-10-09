import getBearData from './utils/getBearData_helper';
import initCommentSection from './utils/commentSection_helper';

const main = async (): Promise<void> => {
  await getBearData();
  initCommentSection();
};

void main();
