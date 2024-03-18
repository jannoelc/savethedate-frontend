import Head from "next/head";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import classNames from "classnames";
import dayjs from "dayjs";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Divider from "@components/Divider";

import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "helpers/string";

const eventDate = dayjs(process.env.NEXT_PUBLIC_WEDDING_DATE);

export default function RSVP() {
  const [timeToEvent, setTimeToEvent] = useState(() =>
    dayjs().to(eventDate, true)
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTimeToEvent(dayjs().to(eventDate, true));
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [timeToEvent]);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_HUSBAND_NAME} &{" "}
          {process.env.NEXT_PUBLIC_WIFE_NAME} - Save the Date
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
          <p className={classNames("text-center mb-5 mx-3", styles.joinUs)}>
            PLEASE JOIN US TO CELEBRATE
          </p>
          <h1 className={styles.title}>
            {process.env.NEXT_PUBLIC_HUSBAND_NAME}{" "}
            <span className={styles.and}>&</span>{" "}
            {process.env.NEXT_PUBLIC_WIFE_NAME}'s
            <div className={styles.wedding}>Wedding</div>
          </h1>
          <p
            className={classNames(
              "text-center my-0",
              styles.sched,
              styles.elegantText
            )}
          >
            <span className="mx-1 d-block d-sm-inline-block">
              {" "}
              {eventDate.format("dddd")}
            </span>
            <strong
              className={classNames(
                "mx-2 d-none d-sm-inline-block",
                styles.pipe
              )}
            >
              |
            </strong>
            <span className="d-inline-block">{eventDate.format("MMMM")}</span>{" "}
            <span className={classNames(styles.t27, "d-inline-block")}>
              {eventDate.format("DD")}
            </span>
            , <span className="d-inline-block">{eventDate.format("YYYY")}</span>
          </p>
          <p
            className={classNames("text-center my-0 mb-3", styles.elegantText)}
          >
            @{" "}
            {capitalizeFirstLetter(
              process.env.NEXT_PUBLIC_WEDDING_VENUE_SHORT_VENUE
            )}
          </p>
          <p className="text-center text-uppercase mb-5">
            {`${timeToEvent} to go!!!`}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Divider style={{ margin: "2rem auto 2rem", width: 240 }} />
          </div>

          <div className="text-center">
            <ButtonGroup>
              <Button href="/details" variant="outline-dark">
                Details
              </Button>
              <Button href="/faq" variant="outline-dark">
                FAQ
              </Button>
              <Button href="/rsvp" variant="outline-dark">
                RSVP
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
