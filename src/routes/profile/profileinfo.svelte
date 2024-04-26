<script lang="ts">
    export let user: any;
    import { imageUrl } from '$lib/utils';
    import Icon from '$lib/icon.svelte';
</script>

<div class="profileInf">
    <Icon id={user.id} image={imageUrl(user.img)}></Icon>
    <div>
        <h1>{user.name}</h1>
    </div>
</div>

<style lang="scss">
    .profileInf {
        display: flex;
        flex-wrap: wrap;
    }
    @media only screen and (max-width: 639px) {
        .profileInf {
            justify-content: center;
        }
    }
</style>