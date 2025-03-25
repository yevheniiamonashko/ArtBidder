<script>
    import Field from "../components/Field.svelte";
    import DropdownMenu from "../components/DropdownMenu.svelte";
    import { authStore } from "../stores/tokenStore.js";
    import router from "page";
    import {onMount} from "svelte";
    export let params;

    let painting; // painting for edit
    let artists = []; //artists for drop down
    let paintingPromise;

    // Form variables
    let title = "";
    let artistID = null;
    let yearOfCreation = "";
    let style = "";
    let material = "";
    let startPrice = "";
    let startDate = "";
    let endDate = "";
    let size = "";
    let selectedArtist = "";

    let isLoggedIn, isAdmin;

    $: isLoggedIn = $authStore.isLoggedIn;
    $: isAdmin = $authStore.user?.isAdmin || false;


    onMount(() => {
        //forbid access to page to not logged in and not admin users
        if (!isLoggedIn || !isAdmin) {
            alert("You are not authorized or don't have admin privileges to access this page.");
            router("/auth");
        }
    });

    // Fetch all artists
    async function fetchArtists() {
        const response = await fetch("http://localhost:3000/artists");
        if (!response.ok) throw new Error("Failed to fetch artists.");
        return await response.json();
    }

    // Fetch the painting details by ID
    async function fetchPainting(paintingID) {
        const response = await fetch(`http://localhost:3000/paintings/${paintingID}`);
        if (!response.ok) throw new Error("Failed to fetch painting data.");
        return await response.json();
    }

    // Combined promise to fetch both painting and artist data
    paintingPromise = (async () => {
        const paintingID = params?.id;
        if (!paintingID) throw new Error("Painting ID is missing from the URL.");

        // Fetch painting and artists in parallel
        const [fetchedPainting, fetchedArtists] = await Promise.all([
            fetchPainting(paintingID),
            fetchArtists(),
        ]);

        // Update local variables for the form
        painting = fetchedPainting;
        artists = fetchedArtists;

        title = painting.title;
        artistID = painting.artistID;
        yearOfCreation = painting.yearOfCreation;
        style = painting.style;
        material = painting.material;
        startPrice = painting.startPrice;
        startDate = painting.startDate;
        endDate = painting.endDate;
        size = painting.size;

        // Set selected artist for the dropdown
        const artist = artists.find((a) => a.artistID === artistID);
        if (artist) {
            selectedArtist = `${artist.firstname} ${artist.lastname}`;
        }

        return { painting, artists };
    })();

    // Handle artist dropdown change
    function handleArtistChange(selected) {
        const artist = artists.find((a) => `${a.firstname} ${a.lastname}` === selected);
        if (artist) {
            artistID = artist.artistID;
        }
    }

    // Handle form submission
    async function handleSubmit() {
       // authorization check
        if (!isLoggedIn || !isAdmin) {
            return alert("You are not authorized or don't have admin privileges to perform this action.");
        }


        if (!title || !artistID || !yearOfCreation || !style || !material || !startPrice || !startDate || !endDate) {
            return alert("All fields are required.");
        }

        const paintingData = {
            title,
            artistID,
            yearOfCreation: parseInt(yearOfCreation),
            style,
            material,
            startPrice: parseFloat(startPrice),
            startDate,
            endDate,
            size,
        };

        try {
            const response = await fetch(`http://localhost:3000/paintings/${painting.paintingID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${$authStore.token}`,
                },
                body: JSON.stringify(paintingData),
            });

            if (response.ok) {
                alert("Auction updated successfully!");
                router("/");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to update auction.");
            }
        } catch (error) {
            alert("An error occurred while updating the auction. Error: " + error);

        }
    }
</script>

<div class="container">
    <div class="form-section">
        <h2>Edit Auction</h2>

        {#await paintingPromise}
            <p>Loading painting data...</p>
        {:then {  artists }}
            <Field bind:value={title} placeholder="Enter title" />
            <div class="dropdown-container">
                <DropdownMenu
                        options={artists.map((artist) => `${artist.firstname} ${artist.lastname}`)}
                        bind:selected={selectedArtist}
                        placeholder="Select artist"
                        onChange={handleArtistChange}
                />
            </div>
            <Field bind:value={yearOfCreation} type="number" placeholder="Enter year of creation" />
            <Field bind:value={style} placeholder="Enter style" />
            <Field bind:value={material} placeholder="Enter material" />
            <Field bind:value={size} placeholder="Enter size" />
            <Field bind:value={startPrice} type="number" placeholder="Enter start price" />
            <Field bind:value={startDate} type="date" placeholder="Enter start date" />
            <Field bind:value={endDate} type="date" placeholder="Enter end date" />

            <button type="submit" class="btn btn-black btn-radius btn-lg btn-submit" on:click={handleSubmit}>
                Update Auction
            </button>
        {:catch error}
            <p>Error loading painting data: {error.message}</p>
        {/await}
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .form-section {
        width: 40%;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
    }

    .dropdown-container {
        margin-bottom: 15px;
        margin-left: 20px;
        width: 100%;
    }

    h2 {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            padding: 10px;
        }

        .form-section {
            width: 80%;
            padding: 15px;
        }

        h2 {
            font-size: 22px;
        }
    }

    @media (max-width: 480px) {
        .form-section {
            width: 90%;
            padding: 10px;
            margin-right: 20px;
        }

        h2 {
            font-size: 18px;
        }
    }
</style>
