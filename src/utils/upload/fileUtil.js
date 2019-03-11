/**
 * Created by alphabeta on 18-1-21.
 */
import uuid from 'uuid';

const uuidv4 = uuid.v4;

const fileName = (name) => {
  const index = name.lastIndexOf('.');
  if (index !== -1) {
    return name.substring(0, index);
  }
};

const fileExt = (name) => {
  const index = name.lastIndexOf('.');
  if (index !== -1) {
    return name.substring(index + 1);
  }
};

const randomFileName = (name) => {
  const ext = fileExt(name);
  const uuidName = uuidv4();
  if (ext !== undefined && ext !== null) {
    return `${uuidName}.${ext}`;
  }
  return uuidName;
};

export {
  fileName,
  fileExt,
  randomFileName,
};
