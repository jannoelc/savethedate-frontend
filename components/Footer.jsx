import classNames from "classnames";
import dayjs from "dayjs";

import styles from "./Footer.module.scss";

const eventDate = dayjs(process.env.NEXT_PUBLIC_WEDDING_DATE);

export default function Footer() {
  return (
    <footer className={classNames(styles.footer, "mt-5")}>
      <div className={styles.logo}>
        <img
          style={{ margin: "2rem auto 2rem", width: 240 }}
          src="/divider_white.svg"
          alt=""
        />
        <div className={styles.logoText}>
          {process.env.NEXT_PUBLIC_HUSBAND_NAME?.[0]}{" "}
          <span className={styles.and}>&</span>{" "}
          {process.env.NEXT_PUBLIC_WIFE_NAME?.[0]}
        </div>
        <div className={styles.logoDate}>
          {eventDate.format("M")} | {eventDate.format("D")} |{" "}
          {eventDate.format("YYYY")}
        </div>
        <div className="pb-5"></div>
      </div>
    </footer>
  );
}
