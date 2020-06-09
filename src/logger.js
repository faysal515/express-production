const winston = require('winston')

const { combine, timestamp, label, printf, colorize } = winston.format


const myFormat = printf((input) => {
  const { level, message, label, timestamp, ...other } = input
  return `${timestamp} [${label}] ${level}: ${message} - ${JSON.stringify(other, null, 2)}`;
});


const logger = function(labelName) {
  // console.log(`New logger - ${labelName}`)
  const formats = [label({ label: labelName }),
    timestamp(),
    myFormat]
  

    const consoleFormats = [label({ label: labelName }),
      timestamp(),
      colorize(),
      myFormat]
    
    
    const formatter = combine(
    ...formats
    )

    const internal =  winston.createLogger({
      level: 'debug',
      format: formatter,
      transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
      ],
    })

    if (process.env.NODE_ENV !== 'production') {
      internal.add(
        new winston.transports.Console({
          format: combine(...consoleFormats)
        })
      )
    }

    return internal
}



module.exports = logger