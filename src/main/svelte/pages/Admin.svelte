<!--<script context="module" lang="ts">

</script>-->
<script>
    import MovieEntity from "../../ts/entity/MovieEntity";
    import {postMovieEntry} from "./AdminService";
    let title;
    let runningTime;
    let genre;
    let genres = [];
    let format;
    let formats = [];
    let source;
    let actor;
    let actors = [];
    let audioFormat;
    let audioFormats = [];

    /*TODO can use reactivity to show components from arrays*/
    const submitMovieEntry = () => {
        let data = new MovieEntity();
        data.title = title;
        data.runningTime = runningTime;
        data.genres = genres;
        data.formats = formats;
        data.actors = actors;
        data.audioFormats = audioFormats;
        postMovieEntry(data);
    }
</script>
<style>

</style>
<h1>Create a new film entry</h1>
<form>
    <input bind:value={title} placeholder="Enter title"/>
    <input bind:value={genre} placeholder="Enter a genre" on:change={() => genres.push(genre)}/><!--TODO either on change or button click need to add genre to list-->
    <input bind:value={runningTime} placeholder="Enter running time"/>
    <input bind:value={format} placeholder="Enter a format" on:change={() => formats.push(format)}/>
    <input bind:value={source} placeholder="Enter source"/><!--TODO need to figure out what the purpose of source is-->
    <input bind:value={actor} placeholder="Enter an actor associated with film" on:change={() => actors.push(actor)}/>
    <input bind:value={audioFormat} placeholder="Enter an audioFormat used for this film" on:change={() => audioFormats.push(audioFormat)}/>
    <button on:click={submitMovieEntry}>Submit</button>
</form>