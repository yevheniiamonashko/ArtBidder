<script>
    import Field from './Field.svelte';
    import AuctionStatus from './AuctionStatus.svelte';
    import { authStore } from '../stores/tokenStore.js';

    export let paintingId;
    export let currentBid = 0;
    export let startDate = '';
    export let endDate = '';
    export let startPrice = 0;

    let bidAmount = '';
    let bidHistory = [];
    let isLoggedIn = false;

    // Reactive subscription to the auth store
    $: isLoggedIn = $authStore.isLoggedIn;

    // Convert string dates to Date objects for comparison
    const now = new Date();
    const auctionStart = new Date(startDate);
    const auctionEnd = new Date(endDate);


    async function fetchPaintingDetails() {
        try {
            const response = await fetch(`http://localhost:3000/paintings/${paintingId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch painting details: ${response.statusText}`);
            }
            const painting = await response.json();
            currentBid = painting.currentBid; // Update current bid dynamically
        } catch (error) {
            console.error('Error fetching painting details:', error);
        }
    }


    async function fetchBidHistory() {
        try {
            const response = await fetch(`http://localhost:3000/paintings/${paintingId}/bids`);
            if (!response.ok) {
                throw new Error(`Failed to fetch bid history: ${response.statusText}`);
            }
            const data = await response.json();

            if (Array.isArray(data.bids)) {

                bidHistory = data.bids.sort((a, b) => b.amount - a.amount);


                if (bidHistory.length > 0) {
                    currentBid = bidHistory[0].amount;
                }
            } else {
                console.error('Bids is not an array:', data.bids);
                bidHistory = [];
            }
        } catch (error) {
            console.error('Error fetching bid history:', error);
            bidHistory = [];
        }
    }

    async function submitBid() {
        const bidValue = parseFloat(bidAmount);

        if (!bidValue || isNaN(bidValue) || bidValue <= 0) {
            alert('Please enter a valid bid amount.');
            return;
        }

        if (bidValue <= currentBid || bidValue <= startPrice) {
            alert('Bid amount must be higher than the current bid and starting price.');
            return;
        }

        const formattedDate = new Date().toISOString().split('T')[0];

        try {
            const response = await fetch('http://localhost:3000/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${$authStore.token}`,
                },
                body: JSON.stringify({
                    paintingID: paintingId,
                    amount: bidValue,
                    date: formattedDate,
                }),
            });

            if (response.ok) {
                alert('Bid submitted successfully!');


                await fetchPaintingDetails();
                await fetchBidHistory();
                bidAmount = '';
            } else {
                const errorText = await response.text();

                alert('Failed to submit bid. ' + errorText);
            }
        } catch (error) {

            alert('Bid submission failed. Please try again later. Error: ' + error.message);
        }
    }


    fetchPaintingDetails();
    fetchBidHistory();
</script>

<div class="bid-box">
    <h2 class="bid-box-header">Current Bid: €{currentBid}</h2>
    <hr class="section-divider" />

    <div class="auction-status">
        <AuctionStatus startDate={startDate} endDate={endDate} />
    </div>


    {#if isLoggedIn && now >= auctionStart && now <= auctionEnd}
        <div class="bid-form">
            <div class="bid-submit">
                <Field type="number" placeholder="Enter your bid" bind:value={bidAmount} />
                <button class="btn btn-black btn-radius" on:click={submitBid}>Submit Bid</button>
            </div>
        </div>
    {:else if !isLoggedIn}
        <p>Please log in to place a bid.</p>
    {/if}

    <hr class="section-divider" />

    <h3 class="bid-history-header">Bid History</h3>
    {#if bidHistory.length > 0}
        <ul>
            {#each bidHistory as bid}
                <li>
                    <strong>User {bid.userID}:</strong> €{bid.amount}
                    <em>({bid.bidDate})</em>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No bids placed yet.</p>
    {/if}
</div>

<style>
    .bid-box {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background: #aab8ba;
    }

    .section-divider {
        border: none;
        height: 1px;
        background: #ccc;
        margin: 20px 0;
    }

    .bid-submit {
        margin-top: 20px;
        justify-content: center;
        gap: 30px;
        margin-left: 50px;
        margin-right: 50px;
    }

    .auction-status {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .bid-box-header {
        font-size: 20px;
    }

    .bid-history-header {
        font-size: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
    }
</style>
