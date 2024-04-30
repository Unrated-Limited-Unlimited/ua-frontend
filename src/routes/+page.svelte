<script lang="ts">
    import { featureFlagStore } from "../store/featureFlagStore";
</script>

<body>
    <div class="main-window">
        <h1>Welcome to Unrated</h1>
        <p>A website for every { $featureFlagStore?.wiskeySpelling } enjoyer!</p>
    </div>
</body>

<style>
</style>