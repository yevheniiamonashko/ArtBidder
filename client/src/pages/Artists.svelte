<script>

    import Card from "../components/Card.svelte";

    let artists = [];
    let artistPromise;

    // Fetch the painting data from the backend API
    async function fetchArtists() {
        try {
            const response = await fetch('http://localhost:3000/artists');
            if (response.ok) {
                artists = await response.json();
                return artists;
            } else {
               alert('Failed to fetch artists:'+ response.statusText);
            }
        } catch (error) {
            alert('Error fetching artists:'+ error);
        }
    }
    artistPromise = fetchArtists();
</script>
<div class="card-container">
    {#await artistPromise}
        <p>...Loading artists</p>
    {:then artists}
    {#if artists.length > 0}
        {#each artists as artist}
            <Card
                    id={artist.artistID}
                    imageURL={artist.imageURL}
                    title={artist.firstname+" "+artist.lastname}
                    description={artist.style}
                    linkText="View Details"
                    linkUrl={`/artists/${artist.artistID}`}
            />
        {/each}
    {:else}
        <p>No artists available.</p>
    {/if}
    {:catch error}
        <p>Error: {error.message}</p>
    {/await}

</div>

<style>
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
