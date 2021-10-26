import React from 'react';
import { Alert, Button } from 'react-native';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';
import FormikTextInput from '../SignIn/FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../../graphql/mutations';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required'),
  review: yup.string(),
});

const initialValues = {
  ownerName: 'rzwitserloot',
  repositoryName: 'lombok',
  rating: '20',
  review: '',
};

const CreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const history = useHistory();

  const onSubmit = async ({ ownerName, repositoryName, rating, review }) => {
    const { data } = await createReview({
      variables: {
        repositoryName,
        ownerName,
        rating: Number(rating),
        text: review,
      },
    });
    history.push(`/repo/${data.createReview.repositoryId}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, dirty, isValid }) => (
        <>
          <FormikTextInput
            name="ownerName"
            placeholder="Owner Name"
            autoCapitalize="none"
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository Name"
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating"
            keyboardType="number-pad"
          />
          <FormikTextInput name="review" placeholder="Review" />
          <Button
            title="submit"
            onPress={handleSubmit}
            disabled={!dirty || !isValid}
          />
        </>
      )}
    </Formik>
  );
};

export default CreateReview;
