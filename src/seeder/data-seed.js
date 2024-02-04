const { createWriteStream } = require("fs");
const { resolve } = require("path");
const { ToWords } = require("to-words");

const args = process.argv.slice(2);
const [range] = args;

if (!range) {
  throw new Error("Range is required like 1000000 or 5e6");
}

const loopRange = Number(range);

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    ignoreDecimal: true,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  },
});

const numberToText = toWords
  .convert(loopRange)
  .split(" ")
  .join("_")
  .toLocaleLowerCase();

const fileName = `./seed_data_${numberToText}_${Date.now()}.txt`;
const filePath = resolve(__dirname, `./data/${fileName}`);

const paragraphArray = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',\n making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
];

const wstream = createWriteStream(filePath, { flags: "a" });

function writeToStream(i) {
  for (; i < loopRange; i++) {
    console.log("processing index : ", i);
    const data = `${paragraphArray[i % 2 == 0 ? 0 : 1]}\n\n`;
    if (!wstream.write(data)) {
      //global.gc();
      wstream.once("drain", function () {
        writeToStream(i + 1);
      });
      return;
    }
  }
  wstream.end();
  wstream.on("finish", () => {
    console.log("Append operation complete.");
  });
}

writeToStream(0);
