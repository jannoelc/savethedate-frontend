import Head from "next/head";
import { Container } from "react-bootstrap";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Divider from "@components/Divider";
import dayjs from "dayjs";

export default function FAQ() {
  const deadline = dayjs(process.env.NEXT_PUBLIC_RSVP_DEADLINE);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_HUSBAND_NAME} &{" "}
          {process.env.NEXT_PUBLIC_WIFE_NAME}'s Wedding - FAQ
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
            className="text-center mt-3 mb-3"
          >
            FAQ
          </h2>
          <div className="text-center mb-4">
            <em>
              (We'll regularly update this page as we get more questions and
              answers)
            </em>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[
              [
                "How can we contact you ?",
                <>
                  You may reach us via phone
                  <br />
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_HUSBAND_PHONE_NUMBER}`}
                  >
                    {process.env.NEXT_PUBLIC_HUSBAND_PHONE_NUMBER}
                  </a>{" "}
                  ({process.env.NEXT_PUBLIC_HUSBAND_NAME})
                  <br />
                  <a href={`tel:${process.env.NEXT_PUBLIC_WIFE_PHONE_NUMBER}`}>
                    {process.env.NEXT_PUBLIC_WIFE_PHONE_NUMBER}
                  </a>{" "}
                  ({process.env.NEXT_PUBLIC_WIFE_NAME})
                  <br />
                  or on our Messenger accounts
                  <br />
                  <a
                    href={`https://m.me/${process.env.NEXT_PUBLIC_HUSBAND_MESSENGER_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {process.env.NEXT_PUBLIC_HUSBAND_NAME}
                  </a>
                  ,{" "}
                  <a
                    href={`https://m.me/${process.env.NEXT_PUBLIC_WIFE_MESSENGER_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {process.env.NEXT_PUBLIC_WIFE_NAME}
                  </a>
                </>,
              ],
              [
                "How do I RSVP ?",
                "You may RSVP via (1) QR code we attached on your invitation, (2) clicking the link we sent you, or by (3) personally reaching us out on our contact above.",
              ],
              [
                "When is the RSVP deadline ?",
                `You must RSVP prior to the deadline of ${deadline.format(
                  "MMMM DD, YYYY"
                )}.`,
              ],
              [
                "Do I have to RSVP ?",
                "Yes. An RSVP is absolutely REQUIRED for everyone. It is essential in planning for the ceremony seating and reception meals.",
              ],
              [
                "Can I bring my children with me ?",
                <>
                  Per our last discussion with the venue representative, unless
                  your children are part of the entourage, the answer is NO.
                </>,
              ],
              [
                "How many guest can I bring ?",
                <>
                  <span className="d-block mb-2">
                    Please refer to the number of seats reserved for your party
                    in the invitation.
                  </span>
                  <span className="d-block mb-2">
                    Although we would love to accommodate everyone who wants to
                    come and celebrate our big day with us, we can only invite a
                    few limited guests due to restrictions placed because of the
                    pandemic.
                  </span>
                  You may reach us out to see if there will be additional
                  vacancies by {deadline.format("MMMM DD")} onwards.
                </>,
              ],
              [
                "Will the reception be taking place indoors or outdoors ?",
                "The reception will be taking place indoors.",
              ],
              [
                "How many guests are invited ?",
                "We only invited 75 guests. Due to the pandemic, we can only invite up to 50% of the venue's capacity (150) at alert level 2.",
              ],
              [
                "Should I be vaccinated to be able to attend ?",
                <>
                  <span className="d-block mb-2">
                    As per IATF resolution on alert level 2, unvaccinated
                    individuals are still allowed to attend indoor gatherings.
                  </span>
                  If there aren't any impediments for you to get vaccinated, we
                  highly encourage you to do so because vaccines protect both
                  you and people around you as well.
                </>,
              ],
              [
                "Should I bring a mask or face covering to the wedding ?",
                "Mask are required, while face shields are voluntary as per IATF's resolution. We highly encourage you to wear mask at all times so we could have a safe celebration.",
              ],
              [
                "Is there a wedding hashtag ?",
                "None yet. We are gladly taking suggestion so feel free to reach us out!",
              ],
            ].map(([q, a]) => (
              <div key={q} style={{ maxWidth: 640 }}>
                <div
                  className="my-2 text-uppercase"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontWeight: 600,
                  }}
                >
                  {q}
                </div>
                <p className="mb-5">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
