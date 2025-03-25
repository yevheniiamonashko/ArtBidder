<script>
    import Card from "../components/Card.svelte";
    import DropdownMenu from "../components/DropdownMenu.svelte";
    import SearchBar from "../components/SearchBar.svelte";
    import {onMount} from "svelte";

    let paintings = [];
    let selectedStyle = '';
    let selectedArtist = '';
    let selectedMaterial = '';
    let searchTerm = '';
    let paintingsPromise;
    let isFiltered = false;
    let filterOptions = {}


    onMount(async () => {

        const response = await fetch('http://localhost:3000/paintings')
        let data = await response.json();
        data = data.paintings;

        const uniqueStyles = new Set();
        const uniqueMaterials = new Set();
        const uniqueArtists = new Set();

        const artistList = await fetchArtists();
        data.forEach(painting => {
            if (painting.style) uniqueStyles.add(painting.style);
            if (painting.material) uniqueMaterials.add(painting.material);
            const artistData = artistList.find(artist => artist.artistID === painting.artistID);
            if (artistData) {
                uniqueArtists.add(`${artistData.firstname} ${artistData.lastname}`);
            }
        });

        filterOptions.styles = Array.from(uniqueStyles);
        filterOptions.materials = Array.from(uniqueMaterials);
        filterOptions.artists = Array.from(uniqueArtists);


    })

    // Fetch the painting data from the backend API
    async function fetchPaintings(filters = {}) {
        try {
            const query = new URLSearchParams(filters).toString();
            const endpoint = query ? `http://localhost:3000/paintings?${query}` : 'http://localhost:3000/paintings';

            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                paintings = data.paintings || [];

                return paintings;

            }
        } catch (error) {
            alert('Error fetching paintings:'+ error)
        }
    }

    // Fetch all artists from backend (to extract names by artistID)
    async function fetchArtists() {
        try {
            const response = await fetch('http://localhost:3000/artists');
            if (response.ok) {
                return await response.json(); // Return artist list to be used in filter
            } else {
                alert('Failed to fetch artists:'+ response.statusText);
            }
        } catch (error) {
            alert('Error fetching artists:'+ error);
        }
    }





    // Handle filter changes and fetch data based on filters
    function handleFilterChange() {
        const filters = {};
        if (selectedStyle) filters.style = selectedStyle;
        if (selectedMaterial) filters.material = selectedMaterial;
        if (selectedArtist) filters.artist = selectedArtist;
        if (searchTerm) filters.title = searchTerm;

        // Trigger new fetch with applied filters and assign promise
        isFiltered = Object.keys(filters).length > 0;
        paintingsPromise = fetchPaintings(filters);
    }

    function handleSearch(input) {
        searchTerm = input; // Set the search term
        handleFilterChange(); // Re-fetch paintings with the new search term
    }
    function clearFilters() {
        selectedStyle = '';
        selectedMaterial = '';
        selectedArtist = '';
        searchTerm = '';
        isFiltered = false;

        paintingsPromise = fetchPaintings();}

    paintingsPromise = fetchPaintings();


</script>

<div class="filters-search-wrapper">
    <h2>Filter and search auctions</h2>
    <div class="filters-container">

        <DropdownMenu
                options={filterOptions.styles}
                bind:selected={selectedStyle}
                placeholder="Select style"
                onChange={handleFilterChange}
                filter={true}
        />
        <DropdownMenu
                options={filterOptions.materials}
                bind:selected={selectedMaterial}
                placeholder="Select material"
                onChange={handleFilterChange}
                filter={true}
        />
        <DropdownMenu
                options={filterOptions.artists}
                bind:selected={selectedArtist}
                placeholder="Select artist"
                onChange={handleFilterChange}
                filter={true}
        />
    </div>

    <div class="filter-actions">
        <button class=" btn btn-blue btn-radius" on:click={clearFilters}>Clear Filters</button>
    </div>

    <div class="search-container">
        <SearchBar onSearch={handleSearch}/> <!-- Listen to search event -->
    </div>

</div>


<div class="card-container">
    <!-- Paintings List -->
    {#await paintingsPromise}
        <p><strong>...Loading paintings</strong></p>
    {:then paintings}
        {#if paintings.length > 0}
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
        {:else}
            <!-- Display the appropriate message -->
            {#if isFiltered}
                <p><strong>No paintings were found matching the request.</strong></p> <!-- After filtering -->
            {:else}
                <p><strong>No paintings available.</strong></p> <!-- Initial fetch with no results -->
            {/if}
        {/if}
    {:catch error}
        <p style="color: red;">An error occurred: {error.message}</p>
    {/await}


</div>

<style>

    .filter-actions {
        display: flex;
        justify-content: center;

        margin-bottom: 15px;
    }



    .search-container {

        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%
    }

    .filters-search-wrapper {
        background-color: #95d6ea;
        padding: 30px 0;
        text-align: center;
    }

    h2 {
        color: black;
        font-size: 24px;
    }

    .filters-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; /* Adds gap between dropdowns */
        justify-content: center;
        margin-bottom: 30px;
        margin-top: 20px;
        padding-left: 20px;;
        /* Adds space between filters and painting cards */
    }

    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media (max-width: 768px) {
        .filters-container {
            flex-direction: column; /* Stack filters vertically on smaller screens */
            align-items: center; /* Center align the stacked filters */
        }

        .card-container {
            padding: 10px; /* Adjust padding for smaller screens */
        }
    }

    @media (max-width: 480px) {
        .filters-container {
            gap: 10px; /* Reduce gap between filters on smaller screens */
        }

        .card-container {
            gap: 15px; /* Reduce gap between painting cards */
        }
    }
</style>
