# winston-logrotator

> A transport for winston which logs to a rotating file each day.

## Usage

``` js
  var winston = require('winston');
  require('winston-daily-rotate-file');
  
  var transport = new (winston.transports.DailyRotateFile)({
    filename: './log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  });
  
  var logger = new (winston.Logger)({
    transports: [
      transport
    ]
  });

  logger.info('Hello World!');
```

The DailyRotateFile transport can rotate files by minute, hour, day, month, year or weekday. In addition to the options accepted by the File transport, the Daily Rotate File Transport also accepts the following options:

* __datePattern:__ A string representing the pattern to be used when appending the date to the filename (default 'yyyy-MM-dd'). The meta characters used in this string will dictate the frequency of the file rotation. For example, if your datePattern is simply 'HH' you will end up with 24 log files that are picked up and appended to every day.
* __prepend:__ Defines if the rolling time of the log file should be prepended at the beginning of the filename (default 'false').
* __localTime:__ A boolean to define whether time stamps should be local (default 'false' means that UTC time will be used).
* __zippedArchive:__ A boolean to define whether or not to gzip archived log files (default 'false').

Valid meta characters in the datePattern are:

* __yy:__ Last two digits of the year.
* __yyyy:__ Full year.
* __M:__ The month.
* __MM:__ The zero padded month.
* __d:__ The day.
* __dd:__ The zero padded day.
* __H:__ The hour.
* __HH:__ The zero padded hour.
* __m:__ The minute.
* __mm:__ The zero padded minute.
* __ddd:__ The weekday (Mon, Tue, ..., Sun).

*Metadata:* Logged via util.inspect(meta);

## Options

| Field           | Required      | Description  |
| --------------- |-------------- | ----------------------------------- |
| label      | no | which micro service api throwing log     |
| filename      | yes | The filename of the logfile to write output to.      |
| colorize  | no  | Boolean flag indicating if we should colorize output.|
| timestamp | no  | Boolean flag indicating if we should prepend output with timestamps (default false). If function is specified, its return value will be used instead of timestamps. |
| json      | no  | If true, messages will be logged as JSON (default true). |
| size      | no  | The max file size of a log before rotation occurs. Supports 1024, 1k, 1m, 1g. Defaults to 100m |
| keep      | no  | The number of rotated log files to keep (including the primary log file). Defaults to 5 |
| compress  | no  | Optionally compress rotated files with gzip. Defaults to true. |

Additonaly support all the winston file options


## LICENSE
MIT

