<script context="module">
    export const home = Symbol.for('home');
</script>
<script lang="ts">
    import Movie from "../Components/Movie.svelte";
    import MovieEntity from "../../ts/entity/MovieEntity";
    /*let title = 'bones';*/
    let search: string = '';
    let movieArr: Array<MovieEntity> = [];
    function getMovie(): void{
        let criteria: string = `title=${search}`;
        console.info(`Querying for movie: ${criteria}`);

        let xmlHttpRequest: XMLHttpRequest = new XMLHttpRequest();
        let url: string = `movie?${criteria}`;

        xmlHttpRequest.onreadystatechange = function() {
            console.info('Reached on ready state change');
            console.info(`Readystate: ${this.readyState}, Status: ${this.status}, Responsetext`, this.responseText);
            if(this.readyState === 4 && this.status === 200){
                console.info('inside if statement');
                let myArr: Array<MovieEntity> = JSON.parse(this.responseText);
                updateMovies(myArr);
            }
            console.info('after if statement');
        };

        console.info('opening GET request');
        xmlHttpRequest.open("GET", url, true);

        console.info('sending request');
        xmlHttpRequest.send();
    }

    function updateMovies(jsonArr: Array<MovieEntity>): void{
        console.info(jsonArr);
        movieArr = jsonArr;
    }
</script>
<svelte:head>
    <title>Home</title>
</svelte:head>
<h1>Home Page</h1>
<input placeholder="Search for movie" bind:value={search}/>
<button on:click={getMovie}>Search</button>
<p>TODO... start writing content for home page</p>
<div class="movie-div">
    {#if movieArr.length > 0}
        {#each movieArr as movie}
            <Movie {...movie}/>
        {/each}
    {/if}
</div>
<!--
todo need to create components for formats etc. can render in slots inside movie
-->
