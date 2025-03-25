<script>
    export let onSearch;
    let searchTerm ='';
    function handleSearch(event){
        event.preventDefault();
        if(onSearch){
            onSearch(searchTerm);
        }
    }
</script>

<form class="search-bar" on:submit={handleSearch}>
    <div class=" search-bar input-hold">
        <button class="input-icon btn btn-transparent btn-icon btn-radius material-symbols-outlined" type="submit">
            search
        </button>
        <input
                class="search-input input"
                type="search"
                placeholder="Search by title"
                bind:value={searchTerm}
                autocomplete="off"
                required
        >
    </div>
</form>

<style>

    .search-bar {
        width: 350px; /* Adjust the width here to make the search bar wider */
        display: flex;
        align-items: center;
        position: relative;
    }

    .input-icon {
        --h: 34px;
        padding: 0;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }

    .input-icon+.input {
        padding-right: 45px !important;
    }







</style>