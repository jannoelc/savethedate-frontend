import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import * as yup from "yup";

import Axios from "axios";
import Meta from "@components/Meta";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Divider from "@components/Divider";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";

const axios = Axios.create({
  baseURL: "https://sh3ok66822.execute-api.us-east-1.amazonaws.com/default",
});

const validationSchema = yup.object().shape({
  guests: yup.array().of(
    yup.object({
      rsvp: yup.boolean(),
      vaccinated: yup.boolean(),
      name: yup.string().when("rsvp", {
        is: true,
        then: yup.string().required(),
      }),
    })
  ),
  rsvp: yup.string().required(),
  id: yup.string().required(),
});

function createInitialGuestData({ guests, seatsAllotted }) {
  return Array.from({ length: seatsAllotted }).map((_, index) => {
    if (guests[index]) {
      return {
        ...guests[index],
        rsvp: true,
        vaccinated: !!guests[index].vaccinated,
      };
    }

    return {
      name: "",
      rsvp: true,
      vaccinated: false,
    };
  });
}

export default function RSVP() {
  const router = useRouter();

  const { data } = useQuery(
    ["/guest-rsvp", router.query.pid],
    async ({ queryKey }) => {
      const [apiRoute, id] = queryKey;
      const response = await axios.get(apiRoute, {
        params: { id },
      });

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!router.query.pid,
      retry: false,
      onError: ({ response }) => {
        if (response?.data === "INVALID_CODE") {
          router.replace("/rsvp");
        }
      },
    }
  );

  const { mutateAsync } = useMutation(
    (requestData) => axios.post("/guest-rsvp", requestData),
    {
      onSuccess: () => {
        router.reload();
      },
    }
  );

  const initialGuests = useMemo(
    () => data && createInitialGuestData(data),
    [data]
  );

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_HUSBAND_NAME} &{" "}
          {process.env.NEXT_PUBLIC_WIFE_NAME}'s Wedding - RSVP
        </title>
        <Meta />
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
          {data && data.rsvp === true && (
            <div>
              <p className="text-center text-uppercase text-success">
                <strong>
                  Your attendance to the event is already confirmed.
                </strong>
              </p>
              <p
                className="text-center mt-4"
                style={{ letterSpacing: "0.2rem" }}
              >
                WE HAVE RESERVED{" "}
                <strong style={{ fontSize: "1.5rem" }}>
                  {data.guests.filter((guest) => guest.rsvp).length}
                </strong>{" "}
                SEAT
                {data.guests.filter((guest) => guest.rsvp).length > 1 &&
                  "S"}{" "}
                FOR YOU
              </p>
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  letterSpacing: "0.1rem",
                  fontSize: "1rem",
                }}
                className="text-center text-uppercase mt-4"
              >
                <strong>
                  Confirmed Attendee
                  {data.guests.filter((guest) => guest.rsvp).length > 1 && "s"}
                </strong>
              </h3>
              {data.guests
                .filter((guest) => guest.rsvp)
                .map((guest) => (
                  <div
                    key={guest.name}
                    className="mb-2 text-uppercase text-center"
                  >
                    {guest.name.trim()}
                  </div>
                ))}
              <br />
              <br />
              <br />
              <br />
              <p className="text-center mt-5">
                <em>
                  Please <a href="/faq">contact us</a> if you like to make
                  changes on your response.
                </em>
              </p>
            </div>
          )}
          {data && data.rsvp === false && (
            <div>
              <p className="text-center text-uppercase text-danger">
                <strong>You have declined to attend the event.</strong>
              </p>
              <p className="text-center my-4">
                Thank you for taking the time to respond to our invitation.
              </p>
              <br />
              <br />
              <br />
              <br />
              <p className="text-center mt-5">
                <em>
                  Please <a href="/faq">contact us</a> if you like to make
                  changes on your response.
                </em>
              </p>
            </div>
          )}
          {data && data.rsvp === undefined && (
            <>
              <p
                className="text-center mb-4"
                style={{ letterSpacing: "0.2rem" }}
              >
                WE HAVE RESERVED{" "}
                <strong style={{ fontSize: "1.5rem" }}>
                  {data?.seatsAllotted}
                </strong>{" "}
                SEAT{data?.seatsAllotted > 1 && "S"} FOR YOU
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Formik
                  initialValues={{
                    guests: initialGuests,
                    id: router.query.pid,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    const rsvp =
                      values.rsvp === "yes" ||
                      (values.rsvp === "no" ? false : undefined);

                    await mutateAsync({
                      ...values,
                      rsvp:
                        values.rsvp === "yes" ||
                        (values.rsvp === "no" ? false : undefined),
                    });
                  }}
                >
                  {({ values, isSubmitting }) => (
                    <Form as={FormikForm} style={{ width: "100%" }}>
                      <Field name="rsvp">
                        {({
                          field, // { name, value, onChange, onBlur }
                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Form.Check
                              type="radio"
                              label="Accepts with pleasure"
                              id="rsvp_yes"
                              name="rsvp"
                              className="mb-2"
                              {...field}
                              value="yes"
                            />
                            <Form.Check
                              type="radio"
                              label="Regretfully declines"
                              name="rsvp"
                              id="rsvp_no"
                              className="mb-2"
                              {...field}
                              value="no"
                            />
                          </div>
                        )}
                      </Field>
                      {values.rsvp === "yes" && (
                        <>
                          <h3
                            style={{
                              fontFamily: "'Libre Baskerville', serif",
                              letterSpacing: "0.2rem",
                              fontSize: "1.2rem",
                            }}
                            className="text-center text-uppercase my-4"
                          >
                            <strong>Guests Info</strong>
                          </h3>
                          <FieldArray name="friends">
                            {() =>
                              values.guests.map((_, index) => (
                                <Row
                                  className="align-items-center mb-4"
                                  key={index}
                                >
                                  <Col
                                    xs={{ span: 12 }}
                                    md={{ span: 6 }}
                                    lg={{ span: 5, offset: 2 }}
                                    xl={{ span: 4, offset: 2 }}
                                  >
                                    <Field name={`guests.${index}.name`}>
                                      {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                      }) => (
                                        <Form.Group className="mb-1">
                                          <Form.Control
                                            type="text"
                                            placeholder={`Guest #${index + 1}`}
                                            {...field}
                                            isInvalid={
                                              !!touched?.guests &&
                                              !!touched.guests[index] &&
                                              !!errors?.guests &&
                                              !!errors.guests[index]
                                            }
                                          />
                                        </Form.Group>
                                      )}
                                    </Field>
                                  </Col>
                                  <Col xs={5} md={3} lg={2} xl={2}>
                                    <Field name={`guests.${index}.rsvp`}>
                                      {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                      }) => (
                                        <Form.Check
                                          type="checkbox"
                                          {...field}
                                          id={`guests.${index}.rsvp`}
                                          label="Attending"
                                          checked={field.value}
                                        />
                                      )}
                                    </Field>
                                  </Col>
                                  <Col xs={5} md={3} lg={2} xl={2}>
                                    <Field name={`guests.${index}.vaccinated`}>
                                      {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                      }) => (
                                        <Form.Check
                                          type="checkbox"
                                          {...field}
                                          id={`guests.${index}.vaccinated`}
                                          label="Vaccinated"
                                          checked={field.value}
                                        />
                                      )}
                                    </Field>
                                  </Col>
                                </Row>
                              ))
                            }
                          </FieldArray>
                        </>
                      )}
                      <div className="mt-5 text-center">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          size="lg"
                          variant="primary"
                          style={{ width: "240px", letterSpacing: "0.1rem" }}
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
              </div>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
}
