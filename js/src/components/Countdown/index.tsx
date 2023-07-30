import { FC } from 'react'
import RcCountdown, { CountdownRenderProps } from 'react-countdown'

const CountdownDigit: FC<{ countdownProps: CountdownRenderProps }> = ({
  countdownProps,
}) => {
  const { days, hours, minutes, seconds } = countdownProps
  const dayLength = days < 10 ? 2 : days.toString().length
  const dayArr = days.toString().padStart(2, '0').split('')
  const timeArr = `${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}${seconds.toString().padStart(2, '0')}`.split('')

  return (
    <div
      className="CountdownDigit grid gap-x-2 gap-y-4"
      style={{
        gridTemplateColumns: `repeat(${dayLength + 6}, minmax(0, 1fr))`,
      }}
    >
      {dayArr.map((number, index) => (
        <div key={`day-${index}`} className="ps-countdown-digit">
          {number}
        </div>
      ))}
      {timeArr.map((number, index) => (
        <>
          <div key={`time-${index}`} className="ps-countdown-digit">
            {number}
          </div>
        </>
      ))}
      <div
        className="text-center text-xs"
        style={{
          gridColumn: `span ${dayLength} / span ${dayLength}`,
        }}
      >
        Days
      </div>
      <div className="col-span-2 text-center text-xs">Hours</div>
      <div className="col-span-2 text-center text-xs">Minutes</div>
      <div className="col-span-2 text-center text-xs">Seconds</div>
    </div>
  )
}

const Countdown: FC<{ toTime: number; title: React.ReactNode }> = ({
  toTime,
  title,
}) => {
  return (
    <div className="text-center my-20">
      <p className="text-2xl">{title}</p>
      <div>
        <RcCountdown
          date={Date.now() + toTime - Date.now()}
          renderer={(props) => <CountdownDigit countdownProps={props} />}
        />
      </div>
    </div>
  )
}

export default Countdown
