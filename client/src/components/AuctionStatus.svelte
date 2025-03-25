<script>
    export let startDate = '';
    export let endDate = '';


    // Calculate the auction status
    const auctionStatus = () => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            return "Auction not started";
        } else if (now > end) {
            return "Auction ended";
        } else {
            const diff = end.getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    };
</script>

<div class="auction-status">

    {#if auctionStatus() === "Auction not started"}
        <strong>Auction not started</strong>
    {:else if auctionStatus() === "Auction ended"}
        <strong>Auction ended</strong>
    {:else}
        <strong>Time left:</strong> {auctionStatus()}
    {/if}

</div>

<style>
    .auction-status {
        font-size: 16px;
        color: #333;
    }
</style>
