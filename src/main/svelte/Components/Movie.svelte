<script lang="ts">
    const NA: string = 'N/A';
    export let _id: string;
    export let title: string = NA;
    export let genres: Array<string> = [];
    export let runningTime: string = NA;
    export let formats: Array<string> = [];
    export let source: string = NA;
    export let actors: Array<string> = [];
    export let audioFormats: Array<string> = [];
</script>
<style>

</style>
<span hidden>{_id}</span>
<p>{title}</p>
<p>{genres.toString()}</p><!--TODO need to create genre card?-->
<p>{runningTime}</p>
<p>{formats.toString()}</p>
<p>{source}</p>
<p>{actors.toString()}</p>
<p>{audioFormats.toString()}</p>