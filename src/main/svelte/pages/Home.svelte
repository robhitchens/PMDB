<script context="module">
    export const home = Symbol.for('home');
</script>
<script>
    import Movie from "../Components/Movie.svelte";
    let title = 'bones';
    let movieArr = [];
    function getMovie(){
        console.info(`Querying for movie: ${title}`);
        let xmlHttpRequest = new XMLHttpRequest();
        let url = `movie?title=${title}`;
        xmlHttpRequest.onreadystatechange = function() {
            console.info('Reached on ready state change');
            console.info(`Readystate: ${this.readyState}, Status: ${this.status}, Responsetext`, this.responseText);
            if(this.readyState === 4 && this.status === 200){
                console.info('inside if statement');
                let myArr = JSON.parse(this.responseText);
                updateMovies(myArr);
            }
            console.info('after if statement');
        };
        console.info('opening GET request');
        xmlHttpRequest.open("GET", url, true);
        console.info('sending request');
        xmlHttpRequest.send();
    }

    function updateMovies(jsonArr){
        console.info(jsonArr);
        movieArr = jsonArr;
    }
</script>
<svelte:head>
    <title>Home</title>
</svelte:head>
<h1>Home Page</h1>
<button on:click={getMovie}>Click me</button>
<p>TODO... start writing content for home page</p>
<div class="movie-div">
    {#if movieArr.length > 0}
        {#each movieArr as movie}
            <Movie
                    hiddenId={movie._id}
                    title={movie.title}
                    genres={movie.genres}
                    runningTime={movie.runningTime}
                    formats={movie.formats}
                    source={movie.source}
                    actors={movie.actors}
                    audioFormats={movie.audioFormats}
            />
        {/each}
    {/if}
</div>
<!--
todo need to create components for formats etc. can render in slots inside movie
-->
