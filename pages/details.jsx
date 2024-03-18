import Head from "next/head";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import dayjs from "dayjs";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Divider from "@components/Divider";
import React, { useEffect, useState } from "react";

import styles from "./details.module.scss";
import { capitalizeFirstLetter } from "helpers/string";

const eventDate = dayjs(process.env.NEXT_PUBLIC_WEDDING_DATE);
const eventReceptionDate = dayjs(
  process.env.NEXT_PUBLIC_WEDDING_RECEPTION_DATE
);

export default function Details() {
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
          {process.env.NEXT_PUBLIC_WIFE_NAME}'s Wedding - Details
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
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              letterSpacing: "0.5rem",
            }}
            className="text-center mt-3 mb-5"
          >
            DETAILS
          </h2>

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
            {capitalizeFirstLetter(`${timeToEvent} to go!!!`)}
          </p>

          <h2 className={classNames("text-center", styles.header)}>Ceremony</h2>

          <p className={classNames("text-center", styles.sched2)}>
            <strong
              className={classNames(
                "d-block",
                styles.elegantText,
                styles.elegantText2
              )}
            >
              {capitalizeFirstLetter(process.env.NEXT_PUBLIC_WEDDING_VENUE_1)}
            </strong>
            <span className={styles.normie}>
              s{process.env.NEXT_PUBLIC_WEDDING_VENUE_2}
            </span>
          </p>
          <p className={classNames("text-center", styles.sched2)}>
            Ceremony starts at exactly{" "}
            <strong>
              <span className={styles.gg}>{eventDate.format("h:mm")}</span>
              {eventDate.format("A")}
            </strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                overflow: "hidden",
                resize: "none",
                maxWidth: "600px",
                width: "100%",
                height: "360px",
              }}
            >
              <div
                id="googlemaps-display1"
                style={{ height: "100%", width: "100%", maxWidth: "100%" }}
              >
                <iframe
                  style={{ height: "100%", width: "100%", border: 0 }}
                  frameBorder={0}
                  src={`https://www.google.com/maps/embed/v1/place?q=${process.env.NEXT_PUBLIC_WEDDING_VENUE_GOOGLE_MAP_QUERY}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
                />
              </div>
            </div>
          </div>

          <div className="my-5" />

          <h2 className={classNames("text-center", styles.header)}>
            Reception
          </h2>
          <p className={classNames("text-center", styles.sched2)}>
            <strong
              className={classNames(
                "d-block",
                styles.elegantText,
                styles.elegantText2
              )}
            >
              {capitalizeFirstLetter(
                process.env.NEXT_PUBLIC_WEDDING_RECEPTION_VENUE_1
              )}
            </strong>
            <span className={styles.normie}>
              {process.env.NEXT_PUBLIC_WEDDING_RECEPTION_VENUE_2}
            </span>
          </p>
          <p className={classNames("text-center", styles.sched2)}>
            Reception starts at{" "}
            <strong>
              <span className={styles.gg}>
                {eventReceptionDate.format("h:mm")}
              </span>
              {eventDate.format("A")}
            </strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                overflow: "hidden",
                resize: "none",
                maxWidth: "600px",
                width: "100%",
                height: "360px",
              }}
            >
              <div
                id="googlemaps-display2"
                style={{ height: "100%", width: "100%", maxWidth: "100%" }}
              >
                <iframe
                  style={{ height: "100%", width: "100%", border: 0 }}
                  frameBorder={0}
                  src={`https://www.google.com/maps/embed/v1/place?q=${process.env.NEXT_PUBLIC_WEDDING_RECEPTION_VENUE_GOOGLE_MAP_QUERY}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
                />
              </div>
            </div>
          </div>

          <div className="my-5" />
          <br />

          <h2 className={classNames("text-center", styles.header)}>Attire</h2>
          <p className={classNames("text-center", styles.sched2)}>
            <strong
              className={classNames(styles.elegantText, styles.elegantText2)}
            >
              <span>Semi</span>-<span>Formal</span>
            </strong>
          </p>
          <p className={classNames("text-center", styles.sched2)}>
            <span
              className={classNames(
                "d-block",
                styles.elegantText,
                styles.elegantText2
              )}
            >
              <span>MEN</span>
            </span>

            <span>Example: Dress shirt, Barong, Chinese-style shirt</span>
          </p>
          <p className={classNames("text-center", styles.sched2)}>
            <span
              className={classNames(
                "d-block",
                styles.elegantText,
                styles.elegantText2
              )}
            >
              <span>WOMEN</span>
            </span>

            <span>Example: Dress, Pantsuit</span>
          </p>
          <p className={classNames("text-center text-danger", styles.sched2)}>
            <strong>PLEASE AVOID</strong>
            <br />
            <strong>
              Jeans, Khakis, Shorts, Flipflops, and White dress (for women)
            </strong>
          </p>

          <div className="my-5" />
          <br />

          <h2 className={classNames("text-center", styles.header)}>
            Covid-19 Guidelines
          </h2>
          <p className={classNames("text-center", "mb-2")}>
            Please wear face masks at all times (except during meals)
          </p>
          <p className={classNames("text-center", "mb-2")}>
            Face shields are voluntary (Alert levels 1 to 3 as per IATF)
          </p>
          <p className={classNames("text-center", "mb-2")}>
            Observe social distancing
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
