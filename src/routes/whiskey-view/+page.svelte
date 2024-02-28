<script>
    const whiskey_data = {
        "name": "Jura",
        "price": "500",
        "summary": "Jura is a good whiskey",
        "percentage": "40%",
        "score": 4,
        "img": "https://bilder.vinmonopolet.no/cache/515x515-0/14676201-1.jpg",
        "volume": "70cl"
    };
</script>

<html lang="en">
    <title>{whiskey_data.name} - Unrated</title>
</html>

<div class="whiskey-site">
    <div class="whiskey-image"><img alt={whiskey_data.name} src={whiskey_data.img}></div>
    <div>{whiskey_data.name}</div>
    <div class="score-container">
        <p>{whiskey_data.score}/5</p>
        <button>review</button>
    </div>
    <div>{whiskey_data.summary}</div>
</div>

<style lang="scss">
    .whiskey-site {
        background-color: salmon;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .score-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
</style>