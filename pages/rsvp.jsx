import Head from "next/head";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Divider from "@components/Divider";
import { Formik, Form as FormikForm, Field } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

const validationSchema = yup.object().shape({
  invitationCode: yup.string().required(),
});

export default function RSVP() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_HUSBAND_NAME} &{" "}
          {process.env.NEXT_PUBLIC_WIFE_NAME}'s Wedding - RSVP
        </title>
        <link key="favicon" rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Divider style={{ margin: "2rem auto 0.5rem", width: 240 }} />
          </div>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              letterSpacing: "0.5rem",
            }}
            className="text-center mt-3 mb-4"
          >
            RSVP
          </h1>
          <p className="text-center" style={{ letterSpacing: "0.1rem" }}>
            Please enter the invitation code to RSVP
          </p>
          <Formik
            initialValues={{
              invitationCode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              router.push(`/rsvp/${values.invitationCode}`);
            }}
          >
            {({ isSubmitting }) => (
              <Form as={FormikForm} style={{ width: "100%" }}>
                <Row className="align-items-center mb-2">
                  <Col
                    xs={{ span: 8, offset: 2 }}
                    md={{ span: 6, offset: 3 }}
                    lg={{ span: 4, offset: 4 }}
                    xl={{ span: 4, offset: 4 }}
                  >
                    <Field name="invitationCode">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                        <Form.Group className="mb-1">
                          <Form.Control
                            type="text"
                            placeholder="Invitation Code"
                            {...field}
                            className="text-center"
                            isInvalid={touched && !!errors?.invitationCode}
                          />
                        </Form.Group>
                      )}
                    </Field>
                  </Col>
                </Row>
                <div className="mt-1 mb-5 text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    style={{ width: "120px", letterSpacing: "0.1rem" }}
                  >
                    {isSubmitting ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="text-center" style={{ letterSpacing: "0.1rem" }}>
            You may also scan the QR code included in the invitation
            <br />
            - or -
            <br />
            click the invitation link sent to you.
          </p>
        </Container>
      </main>

      <Footer />
    </>
  );
}
