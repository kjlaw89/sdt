<script>
	import { onMount } from 'svelte';
	import { days, months, DT } from "./dt.js";

	//export let dateFormat = "Y-m-d";
	//export let timeFormat = "H:i";
	export let value = new DT;
	
	let active = new DT;			// Active month tracker
	let calendarDays = [];			// Track the days to actual display
	let selected = new DT;			// Setup the selected date to the current date
	let today = "";					// Pre-calculated reference for today's date

	$: prev = active.prev();
	$: next = active.next();
	$: value = selected;

	// Rebuild our list of days whenever the active month changes
	$: {
		let date = 1;
		calendarDays = [];

		// Loop through 6 weeks
		for (let i = 0; i < 6; i++) {

			// Loop through each day in the week
			for (let j = 0; j < 7; j++) {
				let dDay = 0;
				let dMonth = 0;
				let dYear = 0;
				let classes = ["sdt-day"];
				let dateValue = date;
				let dateString = "";
				let selectable = true;

				if (i === 0 && j < active.monthStartDate()) {
					classes.push("sdt-prev-month")
					dateValue = prev.daysInMonth() - (active.monthStartDate() - j - 1);
					dDay = dateValue;
					dMonth = prev.getMonth();
					dYear = prev.getYearFull();
				}
				else if (date > active.daysInMonth()) {
					classes.push("sdt-next-month");
					dateValue = date - active.daysInMonth();
					dDay = dateValue;
					dMonth = next.getMonth();
					dYear = next.getYearFull();
					dateString = `${next.getYearFull()}-${next.getMonth()}-${dateValue}`;
					date++;
				}
				else {
					dDay = dateValue;
					dMonth = active.getMonth();
					dYear = active.getYearFull();
					date++;
				}

				dateString = `${dYear}-${dMonth.toString().padStart(2, '0')}-${dDay.toString().padStart(2, '0')}`;

				if (today === dateString) {
					classes.push("sdt-today");
				}

				calendarDays.push({
					c: classes.join(" "),
					d: dateValue.toString(),
					s: selectable,
					t: today === dateString,
					v: dateString,
				});
			}
		}
	}

	onMount(() => {
		let t = new Date;
		selected = new DT(value);
		today = `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, '0')}-${t.getDate().toString().padStart(2, '0')}`;
	});

	function prevClicked() {
		active = prev;
	}

	function nextClicked() {
		active = next;
	}

	function dayClicked(e) {
		selected = new DT(e.target.value + "T00:00");
	}
</script>

<div class="sdt-calendar">
	<header class="sdt-header">
		<a href="javascript:void(0)" class="sdt-prev-item" on:click={prevClicked}><span></span></a>

		<div class="sdt-month-year">
			<span class="sdt-month">{ active.currentMonth() }</span>
			<span class="sdt-year">{ active.currentYear() }</span>
		</div>

		<a href="javascript:void(0)" class="sdt-next-item" on:click={nextClicked}><span></span></a>
	</header>
	<div class="sdt-month">
		<header>
			{#each days as day}
			<span>{ day[1] }</span>
			{/each}
		</header>
		<div class="sdt-days">
			{#each calendarDays as day}
			<span class={ day.c }>
				{#if day.s }
				<button class={ day.c } type="button" value={ day.v } on:click={ dayClicked }>
					{ day.d }
				</button>
				{:else}
				<span>{ day.d }</span>
				{/if}
			</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.sdt-calendar {
		display: inline-block;
		border: 1px solid lightgrey;
	}

	.sdt-header {
		display: flex;
		font-size: 1.5rem;
		padding: 0.25rem 0.5rem;
	}

	.sdt-header > div {
		flex-grow: 1;
	}

	.sdt-month header {
		display: block;
		padding: 0.5rem 0;
	}

	.sdt-month-year {
		text-align: center;
	}

	.sdt-month > header > span,
	.sdt-month > div > span {
		display: inline-block;
		font-weight: bold;
		text-align: center;
		width: 14.2857143%;
	}

	.sdt-prev-item span:before {
		content: "\002190";
		display: block;
		padding: 0 0.25rem;
	}

	.sdt-next-item span:before {
		content: "\002192";
		display: block;
		padding: 0 0.25rem;
	}

	a, button {
		cursor: pointer;
		transition: all 0.3s ease-in-out;
	}

	button {
		background: 0;
		border: 0 transparent;
		border-radius: 150px;
		width: 2rem;
		max-width: 2rem;
		height: 2rem;
		line-height: 0;
	}

	button.sdt-prev-month, button.sdt-next-month {
		color: lightgrey;
	}

	button:hover, button:active, .sdt-today button {
		border: 1px solid lightgrey;
	}

	header { background-color: #EFEFEF; }
</style>