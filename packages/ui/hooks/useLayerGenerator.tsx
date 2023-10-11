import { useSpring, useSprings } from '@react-spring/web';

import { ComponentProps, useEffect, useRef, useState } from 'react';

import { Layer } from '../molecules/Layer';

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    };
  }

  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize, { passive: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const animatedSpringConfig = {
  mass: 1.5,
  tension: 180,
  friction: 30,
};

const initialPaintStyles = {
  insetInlineStart: 0,
  top: 0,
  transformOrigin: 'top left',
};

const initialLayerStyles = {
  transform: 'scale(1, 1)',
  willChange: 'transform, opacity, inset',
  pointerEvents: 'none',
  opacity: 0,
  zIndex: -1,
  ...initialPaintStyles,
  x: '-100%',
};

const initialTriggerStyles = {
  transform: 'scale(1, 1)',
  pointerEvents: 'auto',
  willChange: 'transform, opacity, inset, filter',
  opacity: 1,
  position: 'relative',
  filter: 'blur(0px)',
  zIndex: 0,
  ...initialPaintStyles,
};

let instances = 0;

type Content = Pick<ComponentProps<typeof Layer>, 'content'>['content'];

type LayerContent = { content: Content | ((closeLayer: () => void) => Content) };

type LayerProps = Pick<
  ComponentProps<typeof Layer>,
  'title' | 'closeLabel' | 'leftButtonProps' | 'rightButtonProps'
> &
  LayerContent & {
    placeholder?: Content;
  };

const useLayerGenerator = (layerProps: LayerProps, nbTriggers = 1, exitCallback?: () => void) => {
  const lastKnownTriggerBounds = useRef({ top: 0, left: 0, width: 0, height: 0 });
  const lastKnownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const hasBeenOpened = useRef(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [layerStyles, layerStylesAPI] = useSpring(() => ({
    from: initialLayerStyles,
    immediate: true,
  }));
  const [triggerStyles, triggerStylesAPI] = useSprings(nbTriggers, () => ({
    from: initialTriggerStyles,
    immediate: true,
  }));

  const openLayer = (rect: DOMRect | 'outside', index = 0) => {
    // TODO: fix it to use direction context
    const isRTL = document.documentElement.dir === 'rtl';
    const bounds =
      rect === 'outside'
        ? {
            top: 0,
            left: -1 * windowWidth,
            height: windowHeight,
            width: windowWidth,
          }
        : rect;

    hasBeenOpened.current = true;
    setIsOpen(true);

    lastKnownTriggerBounds.current = bounds;

    layerStylesAPI.start({
      from: {
        insetInlineStart: isRTL ? -1 * bounds.left : bounds.left,
        top: bounds.top,
        transform: `scale(${bounds.width / windowWidth}, ${bounds.height / windowHeight})`,
        pointerEvents: 'none',
        opacity: 0.2,
        transformOrigin: 'top left',
        zIndex: 1 + instances,
        x: '0%',
      },
      to: {
        insetInlineStart: 0,
        top: 0,
        transform: 'scale(1, 1)',
        pointerEvents: 'auto',
        opacity: 1,
        transformOrigin: 'top left',
        zIndex: 1 + instances,
      },
      config: animatedSpringConfig,
    });

    triggerStylesAPI.start((i) => {
      if (i === index) {
        return {
          from: { ...initialTriggerStyles, zIndex: 10 },
          to: {
            insetInlineStart: isRTL ? bounds.left : -1 * bounds.left,
            top: -1 * bounds.top,
            transform: `scale(${windowWidth / bounds.width}, ${windowWidth / bounds.width})`,
            pointerEvents: 'none',
            opacity: 0,
            filter: 'blur(10px)',
            transformOrigin: 'top left',
            position: 'relative',
            zIndex: 10,
          },
          config: animatedSpringConfig,
        };
      }
    });

    instances += 1;
  };

  const closeLayer = () => {
    const bounds = lastKnownTriggerBounds.current;
    // TODO: fix it to use direction context
    const isRTL = document.documentElement.dir === 'rtl';

    layerStylesAPI.start({
      to: {
        insetInlineStart: isRTL ? bounds.left * -1 : bounds.left,
        top: bounds.top,
        transform: `scale(${bounds.width / windowWidth}, ${bounds.height / windowHeight})`,
        pointerEvents: 'none',
        opacity: -1,
        transformOrigin: 'top left',
        zIndex: -1,
      },
      config: animatedSpringConfig,
    });

    triggerStylesAPI.start({
      to: initialTriggerStyles,
      onRest: () => {
        setIsOpen(false);
        exitCallback?.();
      },
      config: animatedSpringConfig,
    });

    instances = Math.max(instances - 1, 0);
  };

  const content =
    typeof layerProps.content === 'function' ? layerProps.content(closeLayer) : layerProps.content;

  const displayContent = layerProps.placeholder == null || isOpen || hasBeenOpened.current;

  return {
    layer: (
      <Layer
        content={displayContent ? content : layerProps.placeholder}
        closeLabel={layerProps.closeLabel}
        title={layerProps.title}
        rightButtonProps={
          layerProps.rightButtonProps && {
            ...layerProps.rightButtonProps,
            onClick: layerProps.rightButtonProps?.onClick || closeLayer,
          }
        }
        leftButtonProps={layerProps.leftButtonProps}
        style={layerStyles}
        onClose={closeLayer}
      />
    ),
    openLayer,
    triggerStyles,
    target: lastKnownRef.current,
  };
};

export default useLayerGenerator;
