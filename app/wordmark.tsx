// Renders "endodeals" inside a label as the two-tone wordmark: "endo" keeps the text color, "deals" is blue.
export function Wordmark({ text }: { text: string }) {
  const [before, after] = text.split("endodeals");
  if (after === undefined) return text;
  return <>{before}<span className="endodeals">endo<span>deals</span></span>{after}</>;
}
