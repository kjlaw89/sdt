<script>
	import Calendar from './Calendar.svelte'
	
	let accent = "#4c51bf";
	let date = "01/01/2020";
</script>

<main>
	<h1>Svelte DateTime!</h1>
	<p>
		A Svelte-based, full featured date & time calendar component. This component 
		provides a standard date and time picker. Input fields can be manually typed in
		or select only.
	</p>

	<div style="width: 350px; margin: 0 auto;">
		<Calendar accent={accent} bind:value={date}></Calendar>

		<br /><br />
		Selected Date: { date }
	</div>
</main>

<svelte:head>
	<title>Svelte DateTime Component</title>
</svelte:head>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align: center;
	}

	p {
		text-align: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
