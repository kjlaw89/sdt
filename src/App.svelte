<script>
	import Calendar from './Calendar.svelte'
	
	let accent = "#FF0";
	let date = "01/01/2020";
</script>

<main>
	<h1>Svelte DateTime!</h1>
	<p>
		A Svelte-based, full featured date & time calendar component. This component 
		provides a standard date and time picker. Input fields can be manually typed in
		or select only.
	</p>

	<Calendar accent={accent} bind:value={date}></Calendar>

	<br /><br />
	Selected Date: { date }

	<br /><br />
	<input type="text" bind:value={accent} />
</main>

<svelte:head>
	<title>Svelte DateTime Component</title>
</svelte:head>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
