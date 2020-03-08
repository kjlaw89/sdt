<script>
	import { onMount } from 'svelte';
	import { days, months, DT } from "./dt.js";
	import { lightOrDark, shadeColor } from "./helpers.js";

	export let accent = "#38A169";	// Accent color for the calendar (header and selects)
	//export let dateFormat = "Y-m-d";
	//export let timeFormat = "H:i";
	export let value = "";
	
	let accentLight = "";			// Calculated accent color (~30% lighter than regular accent)
	let accentLightTextColor = "";	// Text color used for the lighter accent
	let accentTextColor = "";		// Text color to use where accent is used
	let active = new DT;			// Active month tracker
	let calendarDays = [];			// Track the days to actual display
	let selected = new DT;			// Setup the selected date to the current date
	let today = "";					// Pre-calculated reference for today's date

	$: prev = active.prev();
	$: next = active.next();
	$: value = selected.getDate();
	$: accentLight = shadeColor(accent, 70);
	$: accentLightTextColor = lightOrDark(accentLight, "#FFF", "#000");
	$: accentTextColor = lightOrDark(accent, "#FFF", "#000");

	// Rebuild our list of days whenever the active month changes
	$: {
		let date = 1;
		calendarDays = [];

		// Loop through 6 weeks
		for (let i = 0; i < 6; i++) {

			// Loop through each day in the week
			for (let j = 0; j < 7; j++) {
				let classes = ["sdt-day"];
				let dateValue = date;
				let dateString = "";
				let selectable = true;

				if (i === 0 && j < active.monthStartDate()) {
					classes.push("sdt-prev-month")
					dateValue = prev.daysInMonth() - (active.monthStartDate() - j - 1);
					dateString = `${prev.getMonth()}/${dateValue}/${prev.getYear()}`;
				}
				else if (date > active.daysInMonth()) {
					classes.push("sdt-next-month");
					dateValue = date - active.daysInMonth();
					dateString = `${prev.getMonth()}/${dateValue}/${prev.getYear()}`;
					date++;
				}
				else {
					classes.push("sdt-curr-month");
					dateString = `${active.getMonth()}/${dateValue}/${active.getYear()}`;
					date++;
				}

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
		today = `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()}`;
	});

	function prevClicked() {
		active = prev;
	}

	function nextClicked() {
		active = next;
	}

	function dayClicked(e) {
		selected = new DT(e.target.value);
	}
</script>

<style>
	.sdt-calendar {
		display: inline-block;
		border: 1px solid lightgrey;
	}

	header {
		display: flex;
		padding: 0.25rem 0.5rem;
	}

	header div {
		flex-grow: 1;
		text-align: center;
	}

	button {
		background: 0;
		border: 0;
		border-radius: 150px;
		width: 2rem;
		max-width: 2rem;
		height: 2rem;
		line-height: 0;
	}

	button:not(.sdt-curr-month) { color: lightgrey; }

	button:hover, button:active {
		border: 1px solid lightgrey;
	}
</style>

<div class="sdt-calendar">
	<header style="background-color: { accent }; color: { accentTextColor };">
		<a href="javascript:void(0)" class="sdt-prev-item" style="color: {accentTextColor}" on:click={prevClicked}>Prev</a>
		<div class="sdt-month-year">
			<span class="sdt-month">{ active.currentMonth() }</span>
			<span class="sdt-year">{ active.currentYear() }</span>
		</div>
		<a href="javascript:void(0)" class="sdt-next-item" style="color: {accentTextColor}" on:click={nextClicked}>Next</a>
	</header>
	<table>
		<thead>
			{#each days as day}
			<th>{ day[1] }</th>
			{/each}
		</thead>

		<tbody>
			{#each Array(6) as _, i}
			<tr>
				{#each Array(7) as _, d}
				<td>
					{#if calendarDays[(i * 7) + d].s }
					<button 
						class={ calendarDays[(i * 7) + d].c }
						style={ calendarDays[(i * 7) + d].t ? `background-color: ${accentLight}; color: ${accentLightTextColor};` : `` }
						type="button"
						value={ calendarDays[(i * 7) + d].v }
						on:click={dayClicked}
					>
						{ calendarDays[(i * 7) + d].d }
					</button>
					{:else}
					<span>{ calendarDays[(i * 7) + d].d }</span>
					{/if}
				</td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>
