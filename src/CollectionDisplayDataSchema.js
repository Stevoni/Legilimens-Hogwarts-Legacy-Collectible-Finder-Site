import * as yup from 'yup';

const collectionDisplayDataSchema = yup.array().of(
    yup.object().shape({
        region: yup.string().required(),
        regionData: yup.array().of(
            yup.object().shape({
                type: yup.string().required(),
                typeData: yup.array().of(
                    yup.object().shape({
                        index: yup.string().required(),
                        key: yup.string().required(),
                        time: yup.number().required(),
                        video: yup.string().required(),
                        collected: yup.bool().notRequired().default(false)
                    })
                ),
            })
        ),
    })
);


export default collectionDisplayDataSchema