import { act, renderHook } from '@testing-library/react';

import { FunctionComponent, PropsWithChildren } from 'react';

import { PriceRemoteProvider, usePriceRemote } from './PriceRemote';

describe('PriceRemote Context', () => {
  const wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <PriceRemoteProvider
      dates={{ duration: 7 }}
      participants={{ maxAge: 24 }}
      transports={{ departureCity: 'NO' }}
    >
      {children}
    </PriceRemoteProvider>
  );

  describe('usePriceRemote()', () => {
    describe('without a Provider', () => {
      it('throws an error', () => {
        jest.spyOn(global.console, 'error').mockImplementation(() => null);

        expect(() => renderHook(() => usePriceRemote())).toThrow(
          'usePriceRemote() should be used in PriceRemoteProvider',
        );
      });
    });

    describe('with a Provider', () => {
      const defaultExpected = {
        criteria: {
          dates: {
            start: null,
            end: null,
            selectedStart: null,
            selectedEnd: null,
          },
          participants: {
            adults: 0,
            children: 0,
            birthdates: [],
          },
          transports: {
            departureCity: 'NO',
          },
        },
        config: {
          dates: {
            disabledDays: [],
            fromMonth: null,
            dates: [],
            duration: 7,
          },
          participants: {
            max: 10,
            adultsMinCount: 0,
            adultsOnly: false,
            childrenMinAge: 0,
            childrenMaxAge: 24,
            birthdatePattern: null,
            adults: 0,
            children: 0,
            birthdates: [],
          },
          transports: {
            departureCity: 'NO',
            transportMandatory: false,
          },
        },
        setConfig: expect.any(Function),
        setCriteria: expect.any(Function),
        resetDates: expect.any(Function),
        resetParticipants: expect.any(Function),
        resetTransports: expect.any(Function),
      };

      it('returns the default context', () => {
        const { result } = renderHook(() => usePriceRemote(), { wrapper });

        const expected = {
          ...defaultExpected,
        };

        expect(result.current).toEqual(expected);
      });

      describe('updating criteria', () => {
        describe('for dates', () => {
          it('returns the updated context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setCriteria({
                type: 'start',
                payload: new Date('2023-05-01'),
              });
              result.current.setCriteria({
                type: 'end',
                payload: new Date('2023-05-25'),
              });
              result.current.setCriteria({
                type: 'selectedStart',
                payload: new Date('2023-05-02'),
              });
              result.current.setCriteria({
                type: 'selectedEnd',
                payload: new Date('2023-05-24'),
              });
            });

            const expected = {
              ...defaultExpected,
              criteria: {
                dates: {
                  start: new Date('2023-05-01'),
                  end: new Date('2023-05-25'),
                  selectedStart: new Date('2023-05-02'),
                  selectedEnd: new Date('2023-05-24'),
                },
                participants: {
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('for participants', () => {
          it('returns the updated context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setCriteria({
                type: 'adults',
                payload: 2,
              });
              result.current.setCriteria({
                type: 'children',
                payload: 3,
              });
              result.current.setCriteria({
                type: 'birthdates',
                payload: [new Date('2020-05-04'), new Date('2015-06-15')],
              });
            });

            const expected = {
              ...defaultExpected,
              criteria: {
                dates: {
                  start: null,
                  end: null,
                  selectedStart: null,
                  selectedEnd: null,
                },
                participants: {
                  adults: 2,
                  children: 3,
                  birthdates: [new Date('2020-05-04'), new Date('2015-06-15')],
                },
                transports: {
                  departureCity: 'NO',
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('for transports', () => {
          it('returns the updated context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setCriteria({
                type: 'departureCity',
                payload: 'PAR',
              });
            });

            const expected = {
              ...defaultExpected,
              criteria: {
                dates: {
                  start: null,
                  end: null,
                  selectedStart: null,
                  selectedEnd: null,
                },
                participants: {
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'PAR',
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('when reseting dates', () => {
          it('returns the reseted context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setCriteria({
                type: 'start',
                payload: new Date('2023-05-01'),
              });
              result.current.setCriteria({
                type: 'end',
                payload: new Date('2023-05-25'),
              });
              result.current.setCriteria({
                type: 'selectedStart',
                payload: new Date('2023-05-02'),
              });
              result.current.setCriteria({
                type: 'selectedEnd',
                payload: new Date('2023-05-24'),
              });
              result.current.resetDates();
            });

            const expected = {
              ...defaultExpected,
              criteria: {
                dates: {
                  start: null,
                  end: null,
                  selectedStart: null,
                  selectedEnd: null,
                },
                participants: {
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('when reseting participants', () => {
          it('returns the reseted context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setCriteria({
                type: 'adults',
                payload: 2,
              });
              result.current.setCriteria({
                type: 'children',
                payload: 3,
              });
              result.current.setCriteria({
                type: 'birthdates',
                payload: [new Date('2020-05-04'), new Date('2015-06-15')],
              });
              result.current.resetParticipants();
            });

            const expected = {
              ...defaultExpected,
              criteria: {
                dates: {
                  start: null,
                  end: null,
                  selectedStart: null,
                  selectedEnd: null,
                },
                participants: {
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('when reseting transports', () => {
          it('returns the reseted context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setCriteria({
                type: 'departureCity',
                payload: 'PAR',
              });
              result.current.resetTransports();
            });

            const expected = {
              ...defaultExpected,
              criteria: {
                dates: {
                  start: null,
                  end: null,
                  selectedStart: null,
                  selectedEnd: null,
                },
                participants: {
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });
      });

      describe('updating config', () => {
        describe('for dates', () => {
          it('returns the updated context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setConfig({
                type: 'dates',
                payload: [
                  { id: '2022-05-01', price: '15 000 €', status: 'green' },
                  { id: '2022-05-02', price: '12 000 €', status: 'orange' },
                  { id: '2022-05-05', price: null, status: 'default' },
                ],
              });
            });

            const expected = {
              ...defaultExpected,
              config: {
                dates: {
                  disabledDays: [],
                  fromMonth: null,
                  dates: [
                    { id: '2022-05-01', price: '15 000 €', status: 'green' },
                    { id: '2022-05-02', price: '12 000 €', status: 'orange' },
                    { id: '2022-05-05', price: null, status: 'default' },
                  ],
                  duration: 7,
                },
                participants: {
                  max: 10,
                  adultsMinCount: 0,
                  adultsOnly: false,
                  childrenMinAge: 0,
                  childrenMaxAge: 24,
                  birthdatePattern: null,
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                  transportMandatory: false,
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('for disabledDays', () => {
          it('returns the updated context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setConfig({
                type: 'disabledDays',
                payload: [new Date('2023-05-03')],
              });
            });

            const expected = {
              ...defaultExpected,
              config: {
                dates: {
                  disabledDays: [new Date('2023-05-03')],
                  fromMonth: null,
                  dates: [],
                  duration: 7,
                },
                participants: {
                  max: 10,
                  adultsMinCount: 0,
                  adultsOnly: false,
                  childrenMinAge: 0,
                  childrenMaxAge: 24,
                  birthdatePattern: null,
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                  transportMandatory: false,
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });

        describe('for fromMonth', () => {
          it('returns the updated context', () => {
            const { result } = renderHook(() => usePriceRemote(), { wrapper });

            act(() => {
              result.current.setConfig({
                type: 'fromMonth',
                payload: new Date('2023-06-03'),
              });
            });

            const expected = {
              ...defaultExpected,
              config: {
                dates: {
                  disabledDays: [],
                  fromMonth: new Date('2023-06-03'),
                  dates: [],
                  duration: 7,
                },
                participants: {
                  max: 10,
                  adultsMinCount: 0,
                  adultsOnly: false,
                  childrenMinAge: 0,
                  childrenMaxAge: 24,
                  birthdatePattern: null,
                  adults: 0,
                  children: 0,
                  birthdates: [],
                },
                transports: {
                  departureCity: 'NO',
                  transportMandatory: false,
                },
              },
            };

            expect(result.current).toEqual(expected);
          });
        });
      });

      describe('setting config from provider', () => {
        it('returns the context with passed values', () => {
          const participants = {
            adults: 2,
            min: 1,
            max: 4,
            minAge: 12,
            maxAge: 160,
            adultOnly: true,
            birthdatePattern: 'MM/yyyy/dd',
          };
          const transports = {
            departureCity: 'PAR',
            transportMandatory: true,
          };

          const { result } = renderHook(() => usePriceRemote(), {
            wrapper: ({ children }) => (
              <PriceRemoteProvider
                dates={{ duration: 7 }}
                participants={participants}
                transports={transports}
              >
                {children}
              </PriceRemoteProvider>
            ),
          });

          const expected = {
            ...defaultExpected,
            criteria: {
              dates: {
                start: null,
                end: null,
                selectedStart: null,
                selectedEnd: null,
              },
              participants: {
                adults: 0,
                children: 0,
                birthdates: [],
              },
              transports: {
                departureCity: 'PAR',
              },
            },
            config: {
              dates: {
                disabledDays: [],
                fromMonth: null,
                dates: [],
                duration: 7,
              },
              participants: {
                max: 4,
                adultsMinCount: 1,
                adultsOnly: true,
                childrenMinAge: 12,
                childrenMaxAge: 160,
                birthdatePattern: 'MM/yyyy/dd',
                adults: 2,
                children: 0,
                birthdates: [],
              },
              transports: {
                departureCity: 'PAR',
                transportMandatory: true,
              },
            },
          };

          expect(result.current).toEqual(expected);
        });
      });
    });
  });
});
