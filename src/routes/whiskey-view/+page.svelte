<script>
    const whiskey_list = [
    {
        "name": "Jura",
        "price": "500",
        "summary": "Jura is a good whiskey",
        "percentage": "40%",
        "img": "https://bilder.vinmonopolet.no/cache/515x515-0/14676201-1.jpg",
        "volume": "70cl"
    },
    {
        "name": "Tullamore Dew",
        "price": "512",
        "summary": "speaks for itself",
        "percentage": "43%",
        "img": "https://bilder.vinmonopolet.no/cache/515x515-0/5670501-1.jpg",
        "volume": "70cl"
    },
    {
        "name": "Jameson",
        "price": "520",
        "summary": "Safe ol' reliable",
        "percentage": "41%",
        "img": "https://bilder.vinmonopolet.no/cache/515x515-0/16207-1.jpg",
        "volume": "75cl"
    }
    ]
</script>

<body>
    <div>
        <h1>Whiskeys</h1>
        {#each whiskey_list as whiskey}
        <a href="/">
            <div class="whiskey-view-container">
                <div class="whiskey-view-image-container">
                    <img class="whiskey-view-image" src={whiskey.img}>
                </div>
                <div class="whiskey-view-desc">
                    <h3>
                        {whiskey.name}
                    </h3>
                    <p>X X X X O O</p>
                </div>
            </div>
        </a>
        {/each}
    </div>
</body>

<style>
    .whiskey-view-desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:10rem;
        height: auto;
    }
    .whiskey-view-container {
        color: black;
        background-color: white;
        display: flex;
        justify-content:flex-start;
        gap: 1rem;
        flex-direction:row;
        margin: .5rem;
    }
    h3{
        margin: 0;
    }
    .whiskey-view-image-container{
        flex-grow: 1;
        background-color: white;
        max-width: 7rem;
        max-height: 7rem;
        min-width: 4rem;
        height: auto;
        padding: .5rem;
        display: flex;
        justify-content: center;
    }
    .whiskey-view-image {
        max-height: 7rem;
        max-width: 7rem;
        min-width: 2rem;
        height: auto;
    }

</style>