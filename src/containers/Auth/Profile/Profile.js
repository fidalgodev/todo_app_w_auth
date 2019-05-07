import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Message from '../../../components/UI/Message/Message';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 3rem;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Your first name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  lastName: Yup.string()
    .required('Your last name is required.')
    .min(3, 'Too short.')
    .max(25, 'Too long.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string().min(8, 'The password is too short.'),
  confirmPassword: Yup.string().when('password', {
    is: password => password.length > 0,
    then: Yup.string()
      .required('You need to confirm your password.')
      .oneOf([Yup.ref('password'), null], `Password doesn't match`),
  }),
});

const Profile = ({
  firebase,
  editProfile,
  loading,
  error,
  loadingDelete,
  errorDelete,
  deleteUser,
  cleanUp,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // edit the profile here
          await editProfile(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <Heading noMargin size="h1" color="white">
              Edit your profile
            </Heading>
            <Heading bold size="h4" color="white">
              Here you can edit your profile
            </Heading>
            <StyledForm>
              <Field
                type="text"
                name="firstName"
                placeholder="Your first name..."
                component={Input}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Your last name..."
                component={Input}
              />
              <Field
                type="email"
                name="email"
                placeholder="Your email..."
                component={Input}
              />
              <Field
                type="password"
                name="password"
                placeholder="Your password..."
                component={Input}
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Re-type your password..."
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? 'Editing...' : null}
                type="submit"
              >
                Edit
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Profile was updated!
                </Message>
              </MessageWrapper>
              <DeleteWrapper onClick={() => setModalOpened(true)}>
                Delete my account
              </DeleteWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        <Heading noMargin size="h1" color="white">
          Delete your account
        </Heading>
        <Heading bold size="h4" color="white">
          Do you really want to delete your account?
        </Heading>
        <ButtonsWrapper>
          <Button
            contain
            onClick={() => deleteUser()}
            color="red"
            disabled={loadingDelete}
            loading={loadingDelete ? 'Deleting...' : null}
          >
            Delete
          </Button>
          <Button color="main" contain onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
        </ButtonsWrapper>
        <MessageWrapper>
          <Message error show={errorDelete}>
            {errorDelete}
          </Message>
        </MessageWrapper>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
