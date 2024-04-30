<script lang="ts">
    import { featureFlagStore } from "../store/featureFlagStore";
    export let data: PageData;
</script>

<body>
    <div class="main-window">
        <h1>Welcome to Unrated</h1>
        <p>A website for every { $featureFlagStore?.wiskeySpelling } enjoyer!</p>
    </div>
</body>

<style>
</style>