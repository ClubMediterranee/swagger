export default {
  title: 'UI-Library/Component/Atoms/Colors',
  parameters: {
    layout: 'centered',
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => {
  return (
    <div className="flex flex-col gap-y-32 font-sans">
      <div className="bg-black-active bg-ultramarine bg-ultramarine-active bg-lavender bg-lavender-active bg-verdigris bg-verdigris-active bg-sand bg-sand-active bg-lightSand bg-lightSand-active bg-saffron bg-saffron-active bg-sienna bg-sienna-active bg-wave bg-wave-active bg-white-active bg-darkGrey bg-middleGrey bg-grey bg-lightGrey bg-pearl bg-green bg-red bg-orange bg-black bg-white"></div>
      <div>
        <h1 className="text-h1 mb-16 font-serif">Brand Colors</h1>
        <div className="flex flex-wrap gap-20">
          {[
            'black',
            'ultramarine',
            'lavender',
            'verdigris',
            'sand',
            'lightSand',
            'saffron',
            'sienna',
            'wave',
            'white',
          ].map((color) => {
            return (
              <div key={color} className="flex flex-col items-center gap-y-8">
                <div
                  className={`bg-${color} rounded-16 relative`}
                  style={{ width: 100, height: 100 }}
                >
                  <div
                    className={`bg-${color}-active rounded-16 absolute`}
                    style={{ width: 30, height: 30, top: 10, left: 10 }}
                  />
                </div>
                <div className="text-b4">{color}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-h1 mb-16 font-serif">Layout Colors</h1>
        <div className="flex flex-wrap gap-20">
          {['darkGrey', 'middleGrey', 'grey', 'lightGrey', 'pearl', 'green', 'red', 'orange'].map(
            (color) => {
              return (
                <div key={color} className="flex flex-col items-center gap-y-8">
                  <div
                    className={`bg-${color} rounded-16 relative`}
                    style={{ width: 100, height: 100 }}
                  >
                    <div
                      className={`bg-${color}-active rounded-16 absolute`}
                      style={{ width: 30, height: 30, top: 10, left: 10 }}
                    />
                  </div>
                  <div className="text-b4">{color}</div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export const Base = Template.bind({});
