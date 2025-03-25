<script>
    export let items = []; // Array of objects, each with 'label' and 'value'
</script>

<div class="info-card">
    {#each items as { label, value }}
        <div class="info-item">
            <strong>{label}:</strong> {value}
        </div>
    {/each}
</div>

<style>
    .info-card {
        padding: 10px;
        background-color: #95d6ea;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 20px;
        color: #070707;
    }

    .info-item {
        margin-bottom: 10px;
    }

    .info-item strong {
        color: #070707;
    }

    @media (max-width: 768px) {
        .info-card {
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        .info-card {
            font-size: 12px;
        }
    }
</style>
