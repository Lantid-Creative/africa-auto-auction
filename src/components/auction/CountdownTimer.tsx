import useCountdown from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: string;
  size?: 'sm' | 'md' | 'lg';
}

const CountdownTimer = ({ targetDate, size = 'md' }: CountdownTimerProps) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="text-center">
        <span className="text-destructive font-semibold">Auction Ended</span>
      </div>
    );
  }

  const sizeClasses = {
    sm: {
      container: 'gap-2',
      digit: 'min-w-[40px] p-2',
      value: 'text-lg',
      label: 'text-[8px]',
    },
    md: {
      container: 'gap-3',
      digit: 'min-w-[60px] p-3',
      value: 'text-2xl',
      label: 'text-[10px]',
    },
    lg: {
      container: 'gap-4',
      digit: 'min-w-[80px] p-4',
      value: 'text-4xl',
      label: 'text-xs',
    },
  };

  const classes = sizeClasses[size];

  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ];

  return (
    <div className={`flex items-center justify-center ${classes.container}`}>
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div className={`countdown-digit ${classes.digit}`}>
            <span className={`countdown-digit-value ${classes.value}`}>
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className={`countdown-digit-label ${classes.label}`}>
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-primary font-bold mx-1">:</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
