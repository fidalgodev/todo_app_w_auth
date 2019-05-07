import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Message from '../../../components/UI/Message/Message';
import Button from '../../../components/UI/Forms/Button/Button';
import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
});

const RecoverPassword = ({ error, loading, sendEmail, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await sendEmail(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
            Recover your password
          </Heading>
          <Heading size="h4" bold color="white">
            Type in your e-mail to recover your password
          </Heading>
          <StyledForm>
            <Field
              type="email"
              name="email"
              placeholder="Type your email..."
              component={Input}
            />
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Sending recover email...' : null}
              type="submit"
            >
              Recover email
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
                Recover email sent successfully!
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error,
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPassword);
