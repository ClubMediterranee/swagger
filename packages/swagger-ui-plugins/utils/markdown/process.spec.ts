import { createProcessorFactory } from "./processor";

describe("processor", () => {
  it("should process content", async () => {
    const md =
      '<div class="doc-tags flex mt-3">\n' +
      '<div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">\n' +
      "QuickLogin\n" +
      "</div>\n" +
      '<div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">\n' +
      "Gm Full Login\n" +
      "</div>\n" +
      '<div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">\n' +
      "Go Login\n" +
      "</div>\n" +
      '<div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">\n' +
      "Partner Login\n" +
      "</div>\n" +
      "</div>\n" +
      "\n" +
      "\n" +
      "\n" +
      "For a given proposal or booking, provides the list of all available additional services for your attendees such as:";

    const processor = await createProcessorFactory();

    const result = await processor.process({ content: md });

    expect(result.content).toMatchInlineSnapshot(`
      "<div class="doc-tags flex mt-3">
      <div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">
      QuickLogin
      </div>
      <div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">
      Gm Full Login
      </div>
      <div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">
      Go Login
      </div>
      <div class="text-xxs font-semibold flex items-center py-1 px-2 uppercase rounded-small bg-blue text-white uppercase last:mr-0 mr-1">
      Partner Login
      </div>
      </div>
      <p>For a given proposal or booking, provides the list of all available additional services for your attendees such as:</p>"
    `);
  });
});
