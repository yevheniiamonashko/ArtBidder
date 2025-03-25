<script>
    import InfoCard from "../components/InfoCard.svelte"; // Import reusable component
    import Card from "../components/Card.svelte"; // Import Card component for displaying paintings
    export let params;

    let artistPromise;
    let paintingsPromise;

    // Fetch the artist's details by their ID
    async function fetchArtistById(artistID) {
        const response = await fetch(`http://localhost:3000/artists/${artistID}`);
        if (!response.ok) throw new Error("Artist not found.");
        return await response.json();
    }


    async function fetchPaintingsByArtistName(artist) {
        const query = `artist=${encodeURIComponent(`${artist.firstname} ${artist.lastname}`)}`;
        const endpoint = `http://localhost:3000/paintings?${query}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch paintings: ${response.status}`);
        const data = await response.json();
        return data.paintings || [];
    }


    artistPromise = (async () => {
        const artistID = params?.id;
        if (!artistID) throw new Error("Artist ID is missing in the URL.");
        const artist = await fetchArtistById(artistID);
        paintingsPromise = fetchPaintingsByArtistName(artist);
        return artist;
    })();
</script>

<!-- Layout -->
{#await artistPromise}
    <p>Loading artist details...</p>
{:then artist}
    <div class="artist-page">

        <div class="artist-container">
            <div class="artist-image">
                <img src={`http://localhost:3000${artist.imageURL}`} alt="{artist.firstname} {artist.lastname}"/>
            </div>
            <div class="artist-info">
                <h1>{artist.firstname} {artist.lastname}</h1>
                <InfoCard items={[
        { label: 'Country', value: artist.country },
        { label: 'Style', value: artist.style },
        { label: 'Description', value: artist.description }
                                   ]}/>
            </div>
        </div>


        <div class="paintings-section">
            <h2>Present auctions</h2>
            {#await paintingsPromise}
                <p>Loading paintings...</p>
            {:then paintings}
                {#if paintings.length > 0}
                    <div class="paintings-container">
                        {#each paintings as painting}
                            <Card
                                    id={painting.paintingID}
                                    imageURL={painting.imageURL}
                                    title={painting.title}
                                    description={painting.material}
                                    currentBid={painting.currentBid}
                                    auctionStartDate={painting.startDate}
                                    auctionEndDate={painting.endDate}
                                    isPainting={true}
                                    linkText="View Auction"
                                    linkUrl={`/paintings/${painting.paintingID}`}
                            />
                        {/each}
                    </div>
                {:else}
                    <p>No paintings available for this artist.</p>
                {/if}
            {:catch error}
                <p>Failed to load paintings: {error.message}</p>
            {/await}
        </div>
    </div>
{:catch error}
    <p>Failed to load artist details: {error.message}</p>
{/await}

<style>
    .artist-page {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .artist-container {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;
    }

    .artist-image img {
        width: 300px;
        height: auto;
        border-radius: 10px;
        object-fit: cover;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .artist-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .artist-info h1 {
        font-size: 28px;
        margin-bottom: 10px;
        color: #333;
    }

    .paintings-section {
        margin-top: 40px;
    }

    .paintings-section h2 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
    }

    .paintings-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    @media (max-width: 768px) {
        .artist-container {
            flex-direction: column;
            text-align: center;
        }

        .artist-info {
            gap: 8px;
        }

        .paintings-container {
            gap: 15px;
        }
    }

    @media (max-width: 480px) {
        .artist-image img {
            width: 200px;
        }

        .artist-info h1 {
            font-size: 20px;
        }

        .paintings-container {
            gap: 10px;
        }
    }
</style>
