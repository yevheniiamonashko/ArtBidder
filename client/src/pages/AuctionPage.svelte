<script>
    import InfoCard from "../components/InfoCard.svelte";
    import BidBox from "../components/BidBox.svelte";
    import { authStore } from "../stores/tokenStore.js";

    export let params;

    let paintingPromise;
    let isLoggedIn, isAdmin;

    $: isLoggedIn = $authStore.isLoggedIn;

    // Fetch painting details by ID
    async function fetchPaintingById(paintingID) {
        const response = await fetch(`http://localhost:3000/paintings/${paintingID}`);
        if (!response.ok) throw new Error("Painting not found.");
        return await response.json();
    }

    paintingPromise = (async () => {
        const paintingID = params?.id;
        if (!paintingID) throw new Error("Painting ID is missing in the URL.");
        return await fetchPaintingById(paintingID);
    })();
</script>

<!-- Layout -->
{#await paintingPromise}
    <p>Loading painting details...</p>
{:then painting}
    <div class="auction-page">
        <!-- Title of the Painting -->
        <h1 class="painting-title">{painting.title}</h1>

        <div class="auction-container">
            <!-- Painting Image -->
            <div class="painting-image">
                <img src={`http://localhost:3000${painting.imageURL}`} alt="{painting.title}" />
            </div>

            <!-- Bid Box -->
            <div class="bid-section">
                <BidBox
                        paintingId={painting.paintingID}
                        currentBid={painting.currentBid}
                        startDate={painting.startDate}
                        endDate={painting.endDate}
                />
            </div>
        </div>

        <!-- Auction Information Section -->
        <h2 class="auction-info-header">Auction Information</h2>
        <div class="auction-info-container">
            <div class="info-cards">
                <InfoCard
                        items={[
            { label: 'Material', value: painting.material },
            { label: 'Style', value: painting.style },
        ]}
                />
                <InfoCard
                        items={[
            { label: 'Start Price', value: `${painting.startPrice.toLocaleString()}`+'€' },
            { label: 'Start Date', value: painting.startDate },
            { label: 'End Date', value: painting.endDate },
            { label: 'Winner', value: painting.winner ? 'User ' + painting.winner : 'No winner yet' },
        ]}
                />
            </div>
        </div>

    </div>
{:catch error}
    <p>Failed to load painting details: {error.message}</p>
{/await}

<style>
    .auction-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .painting-title {
        text-align: center;
        font-size: 30px;
        color: #333;
        margin-bottom: 20px;
    }

    .auction-container {
        display: flex;
        gap: 20px;
        align-items: flex-start;
        margin-bottom: 40px;
    }

    .painting-image img {
        width: 100%;
        max-width: 400px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .bid-section {
        flex: 1;
        padding: 20px;
        border-radius: 10px;
    }

    .auction-info-header {
        text-align: center;
        font-size: 25px;
        color: #070707;
        margin-bottom: 20px;
    }

    .info-cards {

        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .auction-info-container{

        margin-left: 200px;
        margin-right: 200px;
    }


    @media (max-width: 768px) {
        .auction-container {
            flex-direction: column;
            align-items: center;
        }
        .auction-info-container{

            margin-left: 50px;
            margin-right: 50px;
        }
        .bid-section {
            margin-top: 0;
            flex: 1;
            padding: 20px;
            border-radius: 10px;
        }




    }
</style>
