import { dataset_dev } from "svelte/internal";

export let days = (() => {
	let output = [];
	let date = new Date("01/01/2017");

	for (var i = 1; i <= 7; i++) {
		date.setDate(i);
		output.push ([
			date.toLocaleString(undefined, { weekday: 'long' }),
			date.toLocaleString(undefined, { weekday: 'short' })
		]);
	}

	return output;
})();

export let months = (() => {
	let output = [];
	let date = new Date("01/01/2017");

	for (var i = 0; i <= 11; i++) {
		date.setMonth(i);
		output.push ([
			date.toLocaleString(undefined, { month: 'long' }),
			date.toLocaleString(undefined, { month: 'short' })
		]);
	}

	return output;
})();

export function parseDate(date, format) {
	if (typeof date === "object" && date.__proto__.constructor.name === "DT") {
		return date;
	}
	else if (typeof date === "object" && date.__proto__.constructor.name == "Date") {
		return new DT(date);
	}

	return null;
};

export function formatDate(date, format) {
	date = parseDate(date);
	if (!date) {
		return "";
	}

	if (typeof format !== "string") {
		format = "c";
	}

	const replace = {
		'MMMM': date.currentMonth(),
		'MMM': date.currentMonth(true),
		'MM': date.getMonth().toString().padStart(2, '0'),
		'M': date.getMonth(),
		'DDDD': date.getDayOfMonth().toString().padStart(3, '0'),
		'DDD': date.getDayOfMonth(),
		'DD': date.getDayOfMonth().toString().padStart(2, '0'),
		'D': date.getDayOfMonth(),
		'YYYY': date.getYearFull(),
		'YY': date.getYear()
	};

	for (const key in replace) {
		const value = replace[key];
		const regex = new RegExp(key, 'g');
		format = format.replace(regex, value);
	}

	return format;
};

/**
 * A basic DateTime library
 * Extends the capabilities of a standard Date object
 */
export class DT {

	/**
	 * Create a new instance of DT by passing in
	 * a Date() or number. If null, current Date() is used
	 * @param Date|number date 
	 */
	constructor (date) {
		this.setDate(date);
	}

	after(date) {
		return this.diff(date) >= 0;
	}

	before(date) {
		return this.diff(date) <= 0;
	}

	currentDay(short) {
		return this.day(this.date.getDay(), short);
	}

	currentYear() {
		return this.date.getFullYear();
	}

	currentMonth(short) {
		return this.month(this.date.getMonth(), short);
	}

	day(i, short) {
		if (i < 0 || i > 6) {
			return "";
		}

		return (short === true) ? days[i][1] : days[i][0];
	}

	daysInMonth() {
		return this.totalDays;
	}

	diff(date) {
		date = (date instanceof DT) ? date : new DT(date);
		return +this - +date;
	}

	format(format) {
		return formatDate(this, format);
	}

	getDate() {
		return this.date;
	}

	getDayOfMonth() {
		return this.date.getDate();
	}

	getDay() {
		return this.date.getDay();
	}

	getMonth() {
		return this.date.getMonth() + 1;
	}

	getYear() {
		return this.date.getYear();
	}

	getYearFull() {
		return this.date.getFullYear();
	}

	month(i, short) {
		if (i < 0 || i > 11) {
			return "";
		}

		return (short === true) ? months[i][1] : months[i][0];
	}

	monthStartDate() {
		return this.monthFirst;
	}

	next() {
		if (this.date.getMonth() === 12) {
			return new DT(new Date(this.date.getFullYear() + 1, 1));
		}
		
		return new DT(new Date(this.date.getFullYear(), this.date.getMonth() + 1));
	}

	prev() {
		if (this.date.getMonth() === 1) {
			return new DT(new Date(this.date.getFullYear() - 1, 12));
		}
		
		return new DT(new Date(this.date.getFullYear(), this.date.getMonth() - 1));
	}

	setDay(day) {
		if (isNaN(day) || day < 1 || day > 32) {
			return;
		}

		this.date.setDate(day);
	}

	setDate(date) {
		this.date = new Date;

		if (date instanceof Date) {
			this.date = date;
		}
		else if (date instanceof DT) {
			this.date = new Date(date.getDate());
		}
		else if (!isNaN (date)) {
			this.date = new Date(date);
		}
		else if (typeof date === "string") {
			this.date = new Date(date);
		}

		this.monthFirst = (new Date(this.date.getFullYear(), this.date.getMonth(), 1)).getDay();
		this.totalDays = 32 - (new Date(this.date.getFullYear(), this.date.getMonth(), 32)).getDate();
	}

	toString() {
		return this.date.toDateString();
	}

	valueOf() {
		return +this.date;
	}
}
