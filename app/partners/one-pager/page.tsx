import type { Metadata } from "next";
import pageStyles from "../../page.module.css";
import { OnePager } from "../one-pager";
import styles from "../partners.module.css";

// The one-pager on its own, for printing to public/resources/endo-one-pager.pdf
// (scripts/build-one-pager-pdf.mjs). Not linked anywhere and kept out of search.
export const metadata: Metadata = {
  title: "endo one-pager",
  robots: { index: false, follow: false },
};

export default function OnePagerPage() {
  return (
    <div className={`${pageStyles.page} ${styles.partners} ${styles.printPage}`}>
      <OnePager />
    </div>
  );
}
