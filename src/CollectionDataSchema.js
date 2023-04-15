import * as yup from 'yup';

const collectibleSchema = yup.array().of(yup.object().shape({
  type: yup.string().required(),
  key: yup.string().required(),
  video: yup.string().required(),
  time: yup.number().required(),
  region: yup.string().required(),
  index: yup.string().required(),
}));

export default collectibleSchema