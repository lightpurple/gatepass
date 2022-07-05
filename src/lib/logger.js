import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'systemLogs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf, json } = winston.format;
const LEVEL = Symbol.for('level');

// const customLevels: winston.config.AbstractConfigSetLevels = {
// 	error: 0,
// 	info: 1,
// 	http: 2,
// 	sql: 3
// } // ts 용

const customLevels = {
	levels: {
		error: 0,
		info: 1,
		http: 2,
		sql: 3
	}
};

const filterOnly = (level) => {
	return winston.format((info) => {
		if (info[LEVEL] === level) {
			return info;
		}
	})();
}

const format = combine(
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	json(),
	printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
)

const transports = [
	new winston.transports.Console(),
	// http 로그를 저장할 파일 설정
	new winstonDaily({
		level: 'http',
		datePattern: 'YYYY-MM-DD',
		dirname: `${logDir}/http`,
		filename:  `%DATE%.log`,
		format: filterOnly('http'),
		maxFiles: 10,  // 10일치 로그 파일 저장
		zippedArchive: true,
	}),
	// sql 로그를 저장할 파일 설정
	new winstonDaily({
		level: 'sql',
		datePattern: 'YYYY-MM-DD',
		dirname: `${logDir}/sql`,
		filename:  `%DATE%.log`,
		format: filterOnly('sql'),
		maxFiles: 10,  // 10일치 로그 파일 저장
		zippedArchive: true,
	}),
	// info 레벨 로그를 저장할 파일 설정
	new winstonDaily({
		level: 'info',
		datePattern: 'YYYY-MM-DD',
		dirname: `${logDir}/info`,
		filename:  `%DATE%.log`,
		format: filterOnly('info'),
		maxFiles: 10,  // 10일치 로그 파일 저장
		zippedArchive: true,
	}),
	// error 레벨 로그를 저장할 파일 설정
	new winstonDaily({
		level: 'error',
		datePattern: 'YYYY-MM-DD',
		dirname: `${logDir}/error`,
		filename:  `%DATE%.log`,
		format: filterOnly('error'),
		maxFiles: 10,
		zippedArchive: true,
	}),
]

// function logMessage(message: any, dir: any):any {
// 	return `'${message}' in ${dir}`;
// }

const logger = winston.createLogger({
	levels: customLevels.levels,
	format,
	transports,
})

export default logger;
