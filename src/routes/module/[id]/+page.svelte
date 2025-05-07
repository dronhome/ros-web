<script>
	import ContentArea from '$lib/components/ContentArea.svelte';
	import TestQuiz from '$lib/components/TestQuiz.svelte';
	export let data;
	console.log(data);
</script>

{#if data.content.questions}
	<TestQuiz content={data.content} />
{:else}
	<ContentArea content={data.content}/>
{/if}


