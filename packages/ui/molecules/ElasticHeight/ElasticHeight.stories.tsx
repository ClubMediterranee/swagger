import { StoryFn, Meta } from '@storybook/react';
import { useState } from 'react';

import { Button } from './Buttons/Button';

import { ElasticHeight } from './ElasticHeight';

export default {
  title: 'UI-Library/Component/Molecules/ElasticHeight',
  component: ElasticHeight,
} as Meta<typeof ElasticHeight>;

const Template: StoryFn<typeof ElasticHeight> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)} label="Toggle" />
      <ElasticHeight>
        <div className={isOpen ? '' : 'h-0'}>
          <table>
            <caption>
              <i>Being Funny in a Foreign Language</i> track listing
            </caption>
            <tbody>
              <tr>
                <th scope="col">
                  <abbr title="Number">No.</abbr>
                </th>
                <th scope="col" style={{ width: '50%' }}>
                  Title
                </th>
                <th scope="col" style={{ width: '50%' }}>
                  Writer(s)
                </th>
                <th scope="col">Length</th>
              </tr>
              <tr>
                <th id="track1" scope="row">
                  1.
                </th>
                <td>"The 1975"</td>
                <td>
                  <div>
                    <ul>
                      <li>Matthew Healy</li>
                      <li>George Daniel</li>
                      <li>BJ Burton</li>
                      <li>Tommy King</li>
                    </ul>
                  </div>
                </td>
                <td>4:10</td>
              </tr>
              <tr>
                <th id="track2" scope="row">
                  2.
                </th>
                <td>"Happiness"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>DJ Sabrina the Teenage DJ</li>
                    </ul>
                  </div>
                </td>
                <td>5:03</td>
              </tr>
              <tr>
                <th id="track3" scope="row">
                  3.
                </th>
                <td>"Looking for Somebody (To Love)"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Ilsey Juber</li>
                      <li>Jamie Squire</li>
                    </ul>
                  </div>
                </td>
                <td>2:58</td>
              </tr>
              <tr>
                <th id="track4" scope="row">
                  4.
                </th>
                <td>"Part of the Band"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Squire</li>
                    </ul>
                  </div>
                </td>
                <td>4:20</td>
              </tr>
              <tr>
                <th id="track5" scope="row">
                  5.
                </th>
                <td>"Oh Caroline"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Juber</li>
                      <li>Squire</li>
                      <li>Benjamin Francis Leftwich</li>
                      <li>Jimmy Hogarth</li>
                    </ul>
                  </div>
                </td>
                <td>3:32</td>
              </tr>
              <tr>
                <th id="track6" scope="row">
                  6.
                </th>
                <td>"I'm in Love with You"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Adam Hann</li>
                    </ul>
                  </div>
                </td>
                <td>4:22</td>
              </tr>
              <tr>
                <th id="track7" scope="row">
                  7.
                </th>
                <td>"All I Need to Hear"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Squire</li>
                    </ul>
                  </div>
                </td>
                <td>3:30</td>
              </tr>
              <tr>
                <th id="track8" scope="row">
                  8.
                </th>
                <td>"Wintering"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Jacob Bugden</li>
                    </ul>
                  </div>
                </td>
                <td>2:45</td>
              </tr>
              <tr>
                <th id="track9" scope="row">
                  9.
                </th>
                <td>"Human Too"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Squire</li>
                      <li>Leftwich</li>
                      <li>Hogarth</li>
                    </ul>
                  </div>
                </td>
                <td>3:44</td>
              </tr>
              <tr>
                <th id="track10" scope="row">
                  10.
                </th>
                <td>"About You"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                    </ul>
                  </div>
                </td>
                <td>5:26</td>
              </tr>
              <tr>
                <th id="track11" scope="row">
                  11.
                </th>
                <td>"When We Are Together"</td>
                <td>
                  <div>
                    <ul>
                      <li>Healy</li>
                      <li>Daniel</li>
                      <li>Rob Milton</li>
                    </ul>
                  </div>
                </td>
                <td>3:36</td>
              </tr>
              <tr>
                <th colSpan={3} scope="row">
                  <span>Total length:</span>
                </th>
                <td>43:26</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ElasticHeight>
    </div>
  );
};

export const Default = Template.bind({});
