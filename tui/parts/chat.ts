import {
  BoxRenderable,
  ScrollBarRenderable,
  StyledText,
  stringToStyledText,
  TextRenderable,
  ScrollBoxRenderable,
} from "@opentui/core";

// Main chat inbox for the terminal to render.
//
//

export function makeChatBits(rr: any) {
  const wrap = new BoxRenderable(rr, {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#17191c",
    flexDirection: "column",
  });

  const transcript = new ScrollBoxRenderable(rr, {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#17191c",
    stickyScroll: true,
    stickyStart: "bottom",
    scrollY: true,
    scrollX: false,
    scrollbarOptions: {
      backgroundColor: "#17191c",
      foregroundColor: "#577da7",
    },
  });

  const transcriptText = new TextRenderable(rr, {
    width: "100%",
    fg: "#f1f1f1",
    bg: "#17191c",
    wrapMode: "word",
    selectable: true,
    content: "",
  });

  const divider = new TextRenderable(rr, {
    width: "100%",
    fg: "#94a0ac",
    bg: "#17191c",
    wrapMode: "word",
    selectable: true,
    content: "",
  });

  const mii = new TextRenderable(rr, {
    width: "100%",
    fg: "#728090",
    bg: "#17191c",
    marginBottom: 1,
    content: "",
  });

  // Last wrappers
  transcript.add(transcriptText);
  wrap.add(transcript);
  wrap.add(divider);
  wrap.add(mii);

  // Closing stuff here
  function print(allMsgs: Array<string | StyledText>, mover: number) {
    const chunks: any[] = [];
    for (const one of allMsgs) {
      const made = typeof one === "string" ? stringToStyledText(one) : one;
      chunks.push(...made.chunks);
      chunks.push(...stringToStyledText("\n").chunks);
    }
    transcriptText.content = new StyledText(chunks);
    transcript.scrollTo({ x: 0, y: transcript.scrollHeight });
    const w = Math.max(rr.width - 6, 20);
    const arr = new Array(w).fill("-");
    const where = mover % w;
    arr[where] = "==";
    divider.content = arr.join("");
    mii.content = "conversation " + allMsgs.length + " lines";
  }

  // And lastly printing the output :p
  return { wrap, print };
}
