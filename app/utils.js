
const isDev = process.env.NODE_ENV === 'development';

const isMac = process.platform === 'darwin';


const getIconPath = () => {
  if (isDev) {
    return isMac ? '../public/Template.png' : '../public/icon@2.png';
  } else {
    return isMac ? '../dist/Template.png' : '../dist/icon@2.png';
  }
};

module.exports = {
  isDev,
  isMac,
  getIconPath
}