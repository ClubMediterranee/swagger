'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type FunctionComponent,
  type PropsWithChildren,
  type Reducer,
} from 'react';
import { Matcher } from 'react-day-picker';

interface DatePrice {
  id: string;
  price: string | null;
  status: 'default' | 'green' | 'orange';
}

interface Config {
  dates: {
    disabledDays: Array<Matcher>;
    fromMonth: Date | null;
    dates: Array<DatePrice>;
    duration: number;
  };
  participants: {
    max: number;
    adultsMinCount: number;
    adultsOnly: boolean;
    childrenMinAge: number;
    childrenMaxAge: number;
    birthdatePattern: string | null;
    adults: number;
    children: number;
    birthdates: Date[];
  };
  transports: {
    departureCity: string;
    transportMandatory: boolean;
  };
}

interface ConfigOptions {
  dates: {
    /**
     * minimum duration of stay
     * stricly positive integer
     */
    duration: number;
  };
  participants: {
    /**
     * initial number of adults
     */
    adults?: number;
    /**
     * adults participants minimum count
     */
    min?: number;
    /**
     * participants total maximum count
     */
    max?: number;
    /**
     * children min age in month
     */
    minAge?: number;
    /**
     * children max age in month
     */
    maxAge: number;
    adultOnly?: boolean;
    birthdatePattern?: string;
  };
  transports: {
    departureCity: string;
    transportMandatory?: boolean;
  };
}

type ConfigAction =
  | {
      type: 'disabledDays';
      payload: Array<Matcher>;
    }
  | {
      type: 'dates';
      payload: Array<DatePrice>;
    }
  | {
      type: 'fromMonth';
      payload: Date | null;
    };

const initConfig: (args: ConfigOptions) => Config = ({ dates, participants, transports }) => {
  return {
    dates: {
      disabledDays: [],
      fromMonth: null,
      dates: [],
      duration: dates.duration,
    },
    participants: {
      max: participants.max ?? 10,
      adultsMinCount: participants.min ?? 0,
      adultsOnly: participants.adultOnly ?? false,
      childrenMinAge: participants.minAge ?? 0,
      childrenMaxAge: participants.maxAge,
      birthdatePattern: participants.birthdatePattern ?? null,
      adults: participants.adults ?? 0,
      children: 0,
      birthdates: [],
    },
    transports: {
      departureCity: transports.departureCity,
      transportMandatory: transports.transportMandatory ?? false,
    },
  };
};

const configReducer: Reducer<Config, ConfigAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'dates':
      return {
        ...state,
        dates: {
          ...state.dates,
          dates: payload,
        },
      };
    case 'disabledDays':
      return {
        ...state,
        dates: {
          ...state.dates,
          disabledDays: payload,
        },
      };
    case 'fromMonth':
      return {
        ...state,
        dates: {
          ...state.dates,
          fromMonth: payload,
        },
      };

    default:
      throw new Error('Unandled action type, received "%s"', type);
  }
};

interface CriteriaOptions {
  transports: {
    departureCity: string;
  };
}

interface Criteria {
  dates: {
    start: Date | null;
    end: Date | null;
    selectedStart: Date | null;
    selectedEnd: Date | null;
  };
  participants: {
    adults: number;
    children: number;
    birthdates: Array<Date>;
  };
  transports: {
    departureCity: string;
  };
}

type CriteriaAction =
  | {
      type: 'start';
      payload: Date | null;
    }
  | {
      type: 'end';
      payload: Date | null;
    }
  | {
      type: 'selectedStart';
      payload: Date | null;
    }
  | {
      type: 'selectedEnd';
      payload: Date | null;
    }
  | {
      type: 'adults';
      payload: number;
    }
  | {
      type: 'children';
      payload: number;
    }
  | {
      type: 'birthdates';
      payload: Array<Date>;
    }
  | {
      type: 'departureCity';
      payload: string;
    }
  | {
      type: 'resetDates';
      payload: CriteriaOptions;
    }
  | {
      type: 'resetParticipants';
      payload: CriteriaOptions;
    }
  | {
      type: 'resetTransports';
      payload: CriteriaOptions;
    };

const initCriteria: (args: CriteriaOptions) => Criteria = ({ transports }) => {
  return {
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
      departureCity: transports.departureCity,
    },
  };
};

const criteriaReducer: Reducer<Criteria, CriteriaAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'start':
      return {
        ...state,
        dates: {
          ...state.dates,
          start: payload,
        },
      };
    case 'end':
      return {
        ...state,
        dates: {
          ...state.dates,
          end: payload,
        },
      };
    case 'selectedStart':
      return {
        ...state,
        dates: {
          ...state.dates,
          selectedStart: payload,
        },
      };
    case 'selectedEnd':
      return {
        ...state,
        dates: {
          ...state.dates,
          selectedEnd: payload,
        },
      };
    case 'adults':
      return {
        ...state,
        participants: {
          ...state.participants,
          adults: payload,
        },
      };
    case 'children':
      return {
        ...state,
        participants: {
          ...state.participants,
          children: payload,
        },
      };
    case 'birthdates':
      return {
        ...state,
        participants: {
          ...state.participants,
          birthdates: payload,
        },
      };
    case 'departureCity':
      return {
        ...state,
        transports: {
          ...state.transports,
          departureCity: payload,
        },
      };
    case 'resetDates':
      return {
        ...state,
        dates: initCriteria(payload).dates,
      };
    case 'resetParticipants':
      return {
        ...state,
        participants: initCriteria(payload).participants,
      };
    case 'resetTransports':
      return {
        ...state,
        transports: initCriteria(payload).transports,
      };

    default:
      throw new Error('Unandled action type, received "%s"', type);
  }
};

/**
 * ## TODO: split PriceContext in sub contextes
 * CriteriaContext =>
 *  - DatesContext
 *  - ParticipantsContext
 *  - TransportsContext
 * ConfigContext
 * Wrap that Dates / Praticipants / Transports contextes under ConfigContext
 * Inspired from [this article](https://kentcdodds.com/blog/how-to-optimize-your-context-value)
 * [Code Sandbox](https://codesandbox.io/s/ynn88nx9x)
 */
type PriceRemoteContext = {
  criteria: Criteria;
  config: Config;
  setCriteria: (action: CriteriaAction) => void;
  setConfig: (action: ConfigAction) => void;
  resetDates: () => void;
  resetParticipants: () => void;
  resetTransports: () => void;
};

const PriceRemoteContext = createContext<PriceRemoteContext | null>(null);

export const PriceRemoteProvider: FunctionComponent<
  PropsWithChildren<ConfigOptions & CriteriaOptions>
> = ({ children, ...props }) => {
  const [config, setConfig] = useReducer(configReducer, props, initConfig);
  const [criteria, setCriteria] = useReducer(criteriaReducer, props, initCriteria);

  const resetDates = useCallback(() => {
    setCriteria({ type: 'resetDates', payload: props });
  }, [props]);
  const resetParticipants = useCallback(() => {
    setCriteria({ type: 'resetParticipants', payload: props });
  }, [props]);
  const resetTransports = useCallback(() => {
    setCriteria({ type: 'resetTransports', payload: props });
  }, [props]);

  const value = useMemo(
    () => ({
      criteria,
      config,
      setConfig,
      setCriteria,
      resetDates,
      resetParticipants,
      resetTransports,
    }),
    [criteria, config, resetDates, resetParticipants, resetTransports],
  );

  return <PriceRemoteContext.Provider value={value}>{children}</PriceRemoteContext.Provider>;
};

export const usePriceRemote = () => {
  const context = useContext(PriceRemoteContext);

  if (context === null) {
    throw new Error('usePriceRemote() should be used in PriceRemoteProvider');
  }

  return context;
};
