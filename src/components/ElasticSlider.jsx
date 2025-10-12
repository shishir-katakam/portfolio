import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';

import './ElasticSlider.css';

const MAX_OVERFLOW = 50;

export default function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <RiVolumeDownFill />,
  rightIcon = <RiVolumeUpFill />,
  onValueChange
}) {
  return (
    <div className={`slider-container ${className}`}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onValueChange={onValueChange}
      />
    </div>
  );
}

function Slider({ defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon, onValueChange }) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef(null);
  const [region, setRegion] = useState('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  // Optimized transforms - let Framer Motion handle scheduling
  const scaleTransform = useTransform(() => {
    if (sliderRef.current) {
      const { width } = sliderRef.current.getBoundingClientRect();
      return 1 + overflow.get() / width;
    }
    return 1;
  });
  
  const scaleYTransform = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]);
  const transformOriginCalc = useTransform(() => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      return clientX.get() < left + width / 2 ? 'right' : 'left';
    }
    return 'center';
  });
  
  const heightTransform = useTransform(scale, [1, 1.2], [6, 12]);
  const marginTopTransform = useTransform(scale, [1, 1.2], [0, -3]);
  const marginBottomTransform = useTransform(scale, [1, 1.2], [0, -3]);
  const leftIconX = useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0));
  const rightIconX = useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0));
  const opacityTransform = useTransform(scale, [1, 1.2], [0.7, 1]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  useMotionValueEvent(clientX, 'change', latest => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue;

      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }

      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = useCallback(e => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      clientX.jump(e.clientX);
    }
  }, [startingValue, maxValue, isStepped, stepSize, clientX]);

  const handlePointerDown = useCallback(e => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [handlePointerMove]);

  const handlePointerUp = useCallback(() => {
    animate(overflow, 0, { 
      type: 'spring', 
      bounce: 0.5, 
      duration: 0.3,
      ease: 'easeOut'
    });
  }, [overflow]);

  const getRangePercentage = useCallback(() => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;
    return ((value - startingValue) / totalRange) * 100;
  }, [value, maxValue, startingValue]);

  // Remove unused cleanup
  // Let React and Framer Motion handle optimization

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: opacityTransform,
          willChange: 'transform, opacity'
        }}
        className="slider-wrapper"
      >
        <motion.div
          animate={{
            scale: region === 'left' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.15, ease: 'easeOut' }
          }}
          style={{
            x: leftIconX,
            willChange: 'transform'
          }}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="slider-root"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: scaleTransform,
              scaleY: scaleYTransform,
              transformOrigin: transformOriginCalc,
              height: heightTransform,
              marginTop: marginTopTransform,
              marginBottom: marginBottomTransform,
              willChange: 'transform'
            }}
            className="slider-track-wrapper"
          >
            <div className="slider-track">
              <div className="slider-range" style={{ width: `${getRangePercentage()}%` }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.15, ease: 'easeOut' }
          }}
          style={{
            x: rightIconX,
            willChange: 'transform'
          }}
        >
          {rightIcon}
        </motion.div>
      </motion.div>
      <p className="value-indicator">{Math.round(value)}</p>
    </>
  );
}

function decay(value, max) {
  if (max === 0) {
    return 0;
  }

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}
