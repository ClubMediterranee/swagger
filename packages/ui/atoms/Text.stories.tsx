export default {
  title: 'UI-Library/Component/Atoms/Text',
  parameters: {
    layout: 'centered',
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => {
  return (
    <div className="flex flex-col gap-y-32 font-sans">
      <div className="text-h5 text-h4 text-h3 text-h2 text-h1 text-h0 text-b5 text-b4 text-b3 text-b2 text-b1 text-b0"></div>
      <div>
        <h1 className="text-h1 mb-16 font-serif">Heading</h1>
        <div className="flex flex-col flex-wrap gap-20 font-serif">
          {['h5', 'h4', 'h3', 'h2', 'h1', 'h0'].map((font) => {
            return (
              <div key={font} className="flex flex-col gap-y-8">
                <div>text-{font}</div>
                <div className={`text-${font}`}>Sample text, hello there</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-h1 mb-16 font-serif">Body</h1>
        <div className="flex flex-col flex-wrap gap-20">
          {['b5', 'b4', 'b3', 'b2', 'b1', 'b0'].map((font) => {
            return (
              <div key={font} className="flex flex-col gap-y-8 hover:font-semibold">
                <div>text-{font}</div>
                <div className={`text-${font}`}>Sample text, hello there</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Base = Template.bind({});
